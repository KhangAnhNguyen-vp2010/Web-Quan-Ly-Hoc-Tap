using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs.JoinTheCourse;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        private readonly IWebHostEnvironment _env;

        public StudentsController(QuanLyHocTapContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        ///////////////////////////////////////////////////////LIST COURSE UNREGISTERED///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("unregistered")]
        public async Task<IActionResult> GetUnregisteredCourses(
    int userId,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 6,
    [FromQuery] string search = "",
    [FromQuery] string sort = "")
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            // Lấy danh sách CourseId mà sinh viên đã đăng ký
            var enrolledCourseIds = await _context.Enrollments
                .Where(e => e.UserId == userId)
                .Select(e => e.CourseId)
                .ToListAsync();

            // Bắt đầu query danh sách khóa học chưa đăng ký
            var query = _context.Courses
                .Where(c => !enrolledCourseIds.Contains(c.CourseId))
                .AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(c => c.CourseName.Contains(search));
            }

            // Sort
            query = sort switch
            {
                "name-asc" => query.OrderBy(c => c.CourseName),
                "name-desc" => query.OrderByDescending(c => c.CourseName),
                _ => query.OrderByDescending(c => c.CourseId) // Mặc định: mới nhất
            };

            // Tổng số bản ghi
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            // Phân trang
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Trả kết quả
            return Ok(new
            {
                currentPage = page,
                totalPages,
                pageSize,
                totalItems,
                data
            });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////LIST COURSE REGISTERED///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("registered")]
        public async Task<IActionResult> GetRegisteredCourses(
    int userId,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 6,
    [FromQuery] string search = "",
    [FromQuery] string sort = "")
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            // Lấy danh sách CourseId mà sinh viên đã đăng ký
            var enrolledCourseIds = await _context.Enrollments
                .Where(e => e.UserId == userId)
                .Select(e => e.CourseId)
                .ToListAsync();

            // Bắt đầu query danh sách khóa học đã đăng ký
            var query = _context.Courses
                .Where(c => enrolledCourseIds.Contains(c.CourseId))
                .AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(c => c.CourseName.Contains(search));
            }

            // Sort
            query = sort switch
            {
                "name-asc" => query.OrderBy(c => c.CourseName),
                "name-desc" => query.OrderByDescending(c => c.CourseName),
                _ => query.OrderByDescending(c => c.CourseId) // Mặc định: mới nhất
            };

            // Tổng số bản ghi
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            // Phân trang
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Trả kết quả
            return Ok(new
            {
                currentPage = page,
                totalPages,
                pageSize,
                totalItems,
                data
            });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////JOIN THE COURSE///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPost("JoinTheCourse")]
        public async Task<ActionResult> PostEnrollment([FromBody] JoinTheCourseDto dto)
        {
            // Validate if the user and course exist
            var userExists = await _context.Users.AnyAsync(u => u.UserId == dto.UserID);
            var courseExists = await _context.Courses.AnyAsync(c => c.CourseId == dto.CourseID);

            if (!userExists)
            {
                return NotFound("User not found.");
            }

            if (!courseExists)
            {
                return NotFound("Course not found.");
            }

            // Create a new Enrollment
            var enrollment = new Enrollment
            {
                UserId = dto.UserID,
                CourseId = dto.CourseID,
                EnrollDate = DateOnly.FromDateTime(DateTime.Now)
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Create successfully!!!" });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////SUBMIT ASSIGNMENT///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPatch("submitAssignment/{userId}/{assignmentId}")]
        public async Task<IActionResult> SubmitAssignment(int userId, int assignmentId, [FromForm] List<IFormFile>? files)
        {
            var result = await _context.AssignmentsCompleteds
                        .Where(ac => ac.UserId == userId && ac.AssignmentId == assignmentId)
                        .Select(ac => ac.CompletionId)
                        .FirstOrDefaultAsync();

            if (result == 0)
            {
                return NotFound("CompletionID not found for the given UserID and AssignmentID.");
            }

            var assignmentCompleted = await _context.AssignmentsCompleteds
                                    .FirstOrDefaultAsync(ac => ac.CompletionId == result);

            if (assignmentCompleted == null)
            {
                return NotFound("CompletionID not found.");
            }

            assignmentCompleted.CompletionDate = DateOnly.FromDateTime(DateTime.Now);

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

                        var uploadPath = Path.Combine(wwwRootPath, "assignmentsCompleted", "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var assignmentCompletedFile = new AssignmentCompletedFile
                        {
                            CompletionId = result,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/assignmentsCompleted/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.AssignmentCompletedFiles.Add(assignmentCompletedFile);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Submit Assignment successfully." });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////SUBMIT TEST///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPatch("submitTest/{userId}/{testId}")]
        public async Task<IActionResult> SubmitTest(int userId, int testId, [FromForm] List<IFormFile>? files)
        {
            var result = await _context.TestScores
                        .Where(ac => ac.UserId == userId && ac.TestId == testId)
                        .Select(ac => ac.ScoreId)
                        .FirstOrDefaultAsync();

            if (result == 0)
            {
                return NotFound("ScoreID not found for the given UserID and TestID.");
            }

            var testCompleted = await _context.TestScores
                                    .FirstOrDefaultAsync(ac => ac.ScoreId == result);

            if (testCompleted == null)
            {
                return NotFound("CompletionID not found.");
            }

            testCompleted.CompletedDate = DateTime.Now;

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

                        var uploadPath = Path.Combine(wwwRootPath, "testsCompleted", "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var testCompletedFile = new TestCompletedFile
                        {
                            ScoreId = result,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/testsCompleted/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.TestCompletedFiles.Add(testCompletedFile);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Submit Test successfully." });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////GET THE ASSIGNMENT DUE DATE///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("completion-date/{userId}/{assignmentId}")]
        public async Task<IActionResult> GetCompletionDate(int userId, int assignmentId)
        {
            var result = await _context.AssignmentsCompleteds
                        .Where(ac => ac.UserId == userId && ac.AssignmentId == assignmentId)
                        .Select(ac => ac.CompletionDate)
                        .FirstOrDefaultAsync();

            if (result == default)
            {
                return NotFound("Not found.");
            }

            return Ok(new { CompletionDate = result });

        }
        ///////////////////////////////////////////////////////GET THE ASSIGNMENT DUE DATE///////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////GET TIMELINE (COMPLETION DATE, START TIME, END TIME) OF THE TEST///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("timestamps/{userId}/{testId}")]
        public async Task<IActionResult> GetTimestamps(int userId, int testId)
        {
            var result = await _context.TestScores
                        .Where(ac => ac.UserId == userId && ac.TestId == testId)
                        .Select(ac => new
                        {
                            ac.CompletedDate,
                            ac.StartDate,
                            ac.EndDate,
                        })
                        .FirstOrDefaultAsync();

            if (result == default)
            {
                return NotFound("Not found.");
            }

            var completedStr = result?.CompletedDate?.ToString("yyyy-MM-dd HH:mm");
            var startStr = result?.StartDate?.ToString("yyyy-MM-dd HH:mm");
            var endStr = result?.EndDate?.ToString("yyyy-MM-dd HH:mm");


            return Ok(new { 
                completedDate = completedStr,
                startDate = startStr,
                endDate = endStr,
            });
        }
        ///////////////////////////////////////////////////////GET THE ASSIGNMENT DUE DATE///////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////TAKE THE TEST///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPatch("StartTesting/{userId}/{testId}")]
        public async Task<IActionResult> StartTesting(int userId, int testId)
        {
            var result = await _context.TestScores
                        .Where(ac => ac.UserId == userId && ac.TestId == testId)
                        .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("Test score entry not found.");
            }

            DateTime startDate = DateTime.Now;
            result.StartDate = startDate;
            result.EndDate = startDate.AddMinutes(60);

            await _context.SaveChangesAsync();
            
            return Ok(new {message="StartTesting successfully"});
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    }
}
