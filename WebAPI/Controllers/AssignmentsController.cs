using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using MailKit.Search;
using WebAPI.DTOs.Assignment;
using static System.Net.Mime.MediaTypeNames;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        private readonly IWebHostEnvironment _env;

        public AssignmentsController(QuanLyHocTapContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("Course/{id}")]
        public async Task<IActionResult> GetAssignmentsByCourse(int id, [FromQuery] string? search, [FromQuery] int page = 1)
        {
            const int pageSize = 5;

            var query = _context.Assignments.Where(a => a.CourseId == id);

            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(a => a.AssignmentName.Contains(lowerSearch) ||
                                         a.ExerciseContent.Contains(lowerSearch) ||
                                         a.DueDate.ToString().Contains(lowerSearch));
            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            if (page < 1 || (totalPages > 0 && page > totalPages))
                return BadRequest(new { message = "Page number out of range." });

            var list = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                totalPages,
                totalItems,
                items = list
            });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////////LIST COMPLETED/////////////////////////////////////////////////
        [Authorize]
        [HttpGet("completed/{id}")]
        public async Task<IActionResult> GetCompletedAssignments(int id)
        {
            var result = await _context.Users
                .Join(_context.AssignmentsCompleteds,
                      user => user.UserId,
                      ac => ac.UserId,
                      (user, ac) => new { user, ac })
                .Where(joined => joined.ac.AssignmentId == id && joined.ac.CompletionDate != null)
                .Select(joined => new
                {
                    UserID = joined.user.UserId,
                    UserName = joined.user.Username,
                    Full_Name = joined.user.FullName,
                    AssignmentID = joined.ac.AssignmentId,
                    Completion_Date = joined.ac.CompletionDate
                })
                .ToListAsync();

            return Ok(result);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////LIST UNCOMPLETED/////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("uncompleted/{id}")]
        public async Task<IActionResult> GetUncompletedAssignments(int id)
        {
            var result = await _context.Users
                .Join(_context.AssignmentsCompleteds,
                      user => user.UserId,
                      ac => ac.UserId,
                      (user, ac) => new { user, ac })
                .Where(joined => joined.ac.AssignmentId == id && joined.ac.CompletionDate == null)
                .Select(joined => new
                {
                    UserID = joined.user.UserId,
                    UserName = joined.user.Username,
                    Full_Name = joined.user.FullName,
                    AssignmentID = joined.ac.AssignmentId,
                    Completion_Date = joined.ac.CompletionDate
                })
                .ToListAsync();

            return Ok(result);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////ADD ASSIGNMENT//////////////////////////////////////////////////////
        //[Authorize]
        [HttpPost("AddAssignment")]
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)] // Giới hạn 50MB
        public async Task<IActionResult> CreateAssignment([FromForm] CreateAssignmentDto request, [FromForm] List<IFormFile> files)
        {
            // Bước 1: Tạo Assignment mới
            var assignment = new Assignment
            {
                CourseId = request.CourseID,
                AssignmentName = request.AssignmentName,
                DueDate = DateOnly.FromDateTime(DateTime.UtcNow),
                ExerciseContent = request.AssignmentContent,
            };

            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();

            // Bước 2: Lấy tất cả UserID từ bảng Enrollments đang học CourseID này
            var enrolledUsers = await _context.Enrollments
                .Where(e => e.CourseId == request.CourseID)
                .Select(e => e.UserId)
                .ToListAsync();

         

            // Bước 3: Tạo bản ghi AssignmentsCompleted cho các user
            var assignmentCompletedList = enrolledUsers.Select(userId => new AssignmentsCompleted
            {
                UserId = userId,
                AssignmentId = assignment.AssignmentId,
                CompletionDate = null,
                Grade = null
            });

            _context.AssignmentsCompleteds.AddRange(assignmentCompletedList);
            await _context.SaveChangesAsync();

            var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assignments","files");

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string extension = Path.GetExtension(file.FileName)?.ToLower();
                    string subFolder = extension switch
                    {
                        ".pdf" => "pdf",
                        ".doc" or ".docx" => "word",
                        ".xls" or ".xlsx" => "excel",
                        _ => "others"
                    };

                    // 4. Tạo thư mục nếu chưa có
                    string targetFolder = Path.Combine(rootPath, subFolder);
                    if (!Directory.Exists(targetFolder))
                        Directory.CreateDirectory(targetFolder);

                    // 5. Tạo tên file duy nhất và lưu
                    string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                    string filePath = Path.Combine(targetFolder, uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // 6. Ghi thông tin vào CSDL
                    var assignmentFile = new AssignmentFile
                    {
                        AssignmentId = assignment.AssignmentId,
                        FileName = file.FileName,
                        FileType = extension,
                        FilePath = $"/assignments/files/{subFolder}/{uniqueFileName}",
                        UploadDate = DateTime.Now
                    };

                    _context.AssignmentFiles.Add(assignmentFile);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Assignment created and AssignmentsCompleted generated for enrolled users.",
                assignmentId = assignment.AssignmentId
            });
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        //////////////////////////////////////////////////////////////////////EDIT ASSIGNMENT///////////////////////////////////////////////////////////
        [Authorize]
        [HttpPut("EditAssignment/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateAssignment(int id, [FromForm] UpdateAssignmentDto request, [FromForm] List<IFormFile>? files)
        {
            var assignment = await _context.Assignments.FindAsync(id);

            if (assignment == null)
                return NotFound(new { message = "Assignment not found" });

            // Cập nhật nếu có
            assignment.AssignmentName = request.AssignmentName;
            assignment.ExerciseContent = request.AssignmentContent;

            if (request.DueDate.HasValue)
            {
                assignment.DueDate = request.DueDate.Value;
            }

            await _context.SaveChangesAsync();

            if (files != null && files.Any())
            {
                var uploadDate = DateTime.Now;
                string wwwRootPath = _env.WebRootPath;

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                        string subFolder = extension switch
                        {
                            ".pdf" => "pdf",
                            ".doc" or ".docx" => "word",
                            ".xls" or ".xlsx" => "excel",
                            _ => "others"
                        };

                        var uploadPath = Path.Combine(wwwRootPath, "assignments", "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var assignmentFile = new AssignmentFile
                        {
                            AssignmentId = assignment.AssignmentId,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/assignments/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.AssignmentFiles.Add(assignmentFile);
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Assignment updated successfully" });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        /////////////////////////////////////////////////////////////////DELETE FILE/////////////////////////////////////////////////////////////
        [Authorize]
        [HttpDelete("file/{fileId}")]
        public async Task<IActionResult> DeleteSingleFile(int fileId)
        {
            var file = await _context.AssignmentFiles.FindAsync(fileId);
            if (file == null)
                return NotFound(new { message = "File not found." });

            // Xoá file vật lý
            var fullPath = Path.Combine(_env.WebRootPath, "assignments", file.FilePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);

            _context.AssignmentFiles.Remove(file);
            await _context.SaveChangesAsync();

            return Ok(new { message = "File deleted successfully." });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////////////////GET FILE BY ASSIGNMENT////////////////////////////////////////////////
        [Authorize]
        [HttpGet("{assignmentId}/files")]
        public async Task<IActionResult> GetAssignmentFiles(int assignmentId)
        {
            var files = await _context.AssignmentFiles
                .Where(f => f.AssignmentId == assignmentId)
                .Select(f => new
                {
                    f.FileId,
                    f.FileName,
                    f.FileType,
                    f.FilePath,
                    f.UploadDate
                })
                .ToListAsync();

            if (!files.Any())
                return NotFound(new { message = "No files found for this test." });

            return Ok(files);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////ADDING FILE/////////////////////////////////////////////////////////
        [Authorize]
        [HttpPost("AddFile/{assignmentId}")]
        public async Task<IActionResult> AddingFile(int assignmentId, [FromForm] List<IFormFile>? files)
        {
            if (files != null && files.Any())
            {
                var uploadDate = DateTime.Now;
                string wwwRootPath = _env.WebRootPath;

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                        string subFolder = extension switch
                        {
                            ".pdf" => "pdf",
                            ".doc" or ".docx" => "word",
                            ".xls" or ".xlsx" => "excel",
                            _ => "others"
                        };

                        var uploadPath = Path.Combine(wwwRootPath, "assignments", "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var assignmentFile = new AssignmentFile
                        {
                            AssignmentId = assignmentId,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/assignments/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.AssignmentFiles.Add(assignmentFile);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Adding successfully." });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
