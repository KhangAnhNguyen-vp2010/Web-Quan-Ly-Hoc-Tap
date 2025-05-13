using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs.Test;
using WebAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        private readonly IWebHostEnvironment _env;

        public TestsController(QuanLyHocTapContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        ///////////////////////////////////////////////////GET TESTS BY COURSE///////////////////////////////////////
        [Authorize]
        [HttpGet("Course/{id}")]
        public async Task<IActionResult> GetTestsByCourse(int id, [FromQuery] string? search, [FromQuery] int page = 1)
        {
            const int pageSize = 5;

            var query = _context.Tests.Where(a => a.CourseId == id);

            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(a => a.TestName.Contains(lowerSearch) ||
                                         a.TestContent.Contains(lowerSearch) ||
                                         a.TestDate.ToString().Contains(lowerSearch));
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
        ////////////////////////////////////////////////////////////////////////////////////////////////


        /////////////////////////////////////////////////////////ADD NEW TEST////////////////////////////
        [Authorize]
        [HttpPost("with-files")]
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)] // Giới hạn 50MB
        public async Task<IActionResult> AddTestWithFiles(
    [FromForm] CreateTestDto dto,
    [FromForm] List<IFormFile> files)
        {
            // 1. Tạo bài kiểm tra
            var newTest = new Test
            {
                CourseId = dto.CourseId,
                TestName = dto.testName,
                TestDate = DateOnly.FromDateTime(DateTime.UtcNow),
                TestContent = dto.testContent,
            };

            _context.Tests.Add(newTest);
            await _context.SaveChangesAsync(); // cần để lấy TestID

            // 2. Tạo đường dẫn lưu trữ gốc
            var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "files");


            // 3. Xử lý từng file
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
                    var testFile = new TestFile
                    {
                        TestId = newTest.TestId,
                        FileName = file.FileName,
                        FileType = extension,
                        FilePath = $"/files/{subFolder}/{uniqueFileName}",
                        UploadDate = DateTime.Now
                    };

                    _context.TestFiles.Add(testFile);
                }
            }

            await _context.SaveChangesAsync();

            var enrolledStudentIds = await _context.Enrollments
                                        .Where(e => e.CourseId == newTest.CourseId)
                                        .Select(e => e.UserId)
                                        .ToListAsync();

            foreach (var studentId in enrolledStudentIds)
            {
                var testScore = new TestScore
                {
                    UserId = studentId,
                    TestId = newTest.TestId,
                    Score = null, // hoặc null nếu bạn muốn cập nhật sau
                    CompletedDate = null, // hoặc DateTime.Now nếu muốn mặc định có
                    StartDate = null,
                    EndDate = null,
                };

                _context.TestScores.Add(testScore);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Thêm bài kiểm tra kèm file thành công", testID = newTest.TestId });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////



        /////////////////////////////////////////////////////////EDIT TEST////////////////////////////////
        [Authorize]
        [HttpPut("{id}/with-files")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateTestWithFiles(
    int id,
    [FromForm] UpdateTestDto dto,
    [FromForm] List<IFormFile>? files)
        {
            var test = await _context.Tests.FindAsync(id);
            if (test == null)
                return NotFound(new { message = "Test not found" });

            // Cập nhật thông tin cơ bản
            test.TestName = dto.testName;
            test.TestContent = dto.testContent;
            test.TestDate = dto.testDate;
            test.CourseId = dto.CourseID;
            _context.Tests.Update(test);

            // Nếu có file thì lưu
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

                        var uploadPath = Path.Combine(wwwRootPath, "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var testFile = new TestFile
                        {
                            TestId = test.TestId,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.TestFiles.Add(testFile);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Test updated successfully" });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////////////////DELETE FILE////////////////////
        [Authorize]
        [HttpDelete("file/{fileId}")]
        public async Task<IActionResult> DeleteSingleFile(int fileId)
        {
            var file = await _context.TestFiles.FindAsync(fileId);
            if (file == null)
                return NotFound(new { message = "File not found." });

            // Xoá file vật lý
            var fullPath = Path.Combine(_env.WebRootPath, file.FilePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);

            _context.TestFiles.Remove(file);
            await _context.SaveChangesAsync();

            return Ok(new { message = "File deleted successfully." });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////GET TETS FILE/////////////////////////////////////////
        //[Authorize]
        [HttpGet("{testId}/files")]
        public async Task<IActionResult> GetTestFiles(int testId, string? completed, int userId = 0)
        {
            if (completed == null)
            {
                var files = await _context.TestFiles
                .Where(f => f.TestId == testId)
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
            else
            {
                var result = await _context.TestScores
                        .Where(ac => ac.UserId == userId && ac.TestId == testId)
                        .Select(ac => ac.ScoreId)
                        .FirstOrDefaultAsync();

                var files = await _context.TestCompletedFiles
                .Where(f => f.ScoreId == result)
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
                
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////GET TESTSCORE BY TEST//////////////////////////////////
        [Authorize]
        [HttpGet("course/{courseId}/test/{testId}/scores")]
        public async Task<IActionResult> GetTestScores(int courseId, int testId)
        {
            var scores = await _context.TestScores
                .Where(ts => ts.TestId == testId && ts.Test.CourseId == courseId)
                .Include(ts => ts.User)
                .Select(ts => new
                {
                    ts.UserId,
                    Full_Name = ts.User.FullName,
                    ts.Score,
                    ts.CompletedDate,
                    ts.StartDate,
                    ts.EndDate
                })
                .ToListAsync();

            return Ok(scores);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////ADDING FILE/////////////////////////
        [Authorize]
        [HttpPost("AddFile/{testId}")]
        public async Task<IActionResult> AddingFile(int testId, [FromForm] List<IFormFile>? files)
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

                        var uploadPath = Path.Combine(wwwRootPath, "files", subFolder);
                        Directory.CreateDirectory(uploadPath);

                        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                        var filePath = Path.Combine(uploadPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var testFile = new TestFile
                        {
                            TestId = testId,
                            FileName = file.FileName,
                            FileType = extension,
                            FilePath = $"/files/{subFolder}/{uniqueFileName}",
                            UploadDate = uploadDate
                        };

                        _context.TestFiles.Add(testFile);
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Adding successfully." });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////GET TEST SCORES//////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("student/{userId}/tests/{courseId}")]
        public async Task<IActionResult> GetTestScoresByStudent(int userId, int courseId)
        {
            var results = await _context.TestScores
                .Where(ts => ts.UserId == userId && ts.Test.CourseId == courseId && ts.Score != null)
                .Select(ts => new
                {
                    ts.ScoreId,
                    ts.Test.TestName,
                    ts.CompletedDate,
                    ts.Score,
                    ts.EndDate,
                })
                .ToListAsync();

            // Tính StudyTime
            int studyTime = results.Sum(item => item.CompletedDate <= item.EndDate ? 3 : 1);

            // Tính số lượng bài kiểm tra có điểm
            int count = results.Count;

            int totalTests_Ontime = results.Count(ac => ac.CompletedDate <= ac.EndDate);
            int totalTests_Late = results.Count(ac => ac.CompletedDate > ac.EndDate);

            // Trung bình điểm (Score), làm tròn 1 chữ số thập phân
            decimal avgScore = count > 0 ? Math.Round(results.Average(item => item.Score ?? 0), 1) : 0;

            return Ok(new
            {
                TestScores = results,
                StudyTime = studyTime,
                TotalTests_Ontime = totalTests_Ontime,
                TotalTests_Late = totalTests_Late,
                AverageScore = avgScore
            });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
