using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs.Course;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        private readonly IWebHostEnvironment _env;

        public CoursesController(QuanLyHocTapContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }


        //////////////////////////////////////////////////////// GET LIST COURSE /////////////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCourses(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 6,
    [FromQuery] string search = "",
    [FromQuery] string sort = "")
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            var query = _context.Courses.AsQueryable();

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
                _ => query.OrderByDescending(c => c.CourseId)               // mặc định
            };

            // Total count và phân trang
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                totalPages,
                pageSize,
                totalItems,
                data
            });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////// EDIT COURSE ////////////////////////////////////////////////////////////////////////
        // PUT: api/Courses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, CourseUpdateDto course)
        {
            var _course = await _context.Courses.FindAsync(id);
            if (_course == null)
            {
                return NotFound(new { message = "Không tìm thấy khóa học" });
            }

            _course.CourseName = course.CourseName;
            _course.Description = course.Description;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhật thành công",
                _id = id
            });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////// ADD NEW COURSE ////////////////////////////////////////////////////////////////////////
        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse([FromBody] CourseDto course)
        {

            var newCourse = new Course
            {
                CourseName = course.Name,
                Description = course.Description,
                InstructorId = course.instructorId,
            };

            _context.Courses.Add(newCourse);

            await _context.SaveChangesAsync();

            return Ok("Thêm thành công");
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        

        ///////////////////////////////////////////////////GET LAST ID/////////////////////////////////////////////////////////////////
        [HttpGet("LastId")]
        public async Task<ActionResult<int>> layLastID()
        {
            var lastId = await _context.Courses
                .OrderByDescending(c => c.CourseId)
                .Select(c => c.CourseId)
                .FirstOrDefaultAsync(); // Lấy ID lớn nhất (hoặc 0 nếu không có khóa học)

            // Trả về lastId, nếu không có khóa học sẽ trả về 0
            return Ok(lastId);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        //////////////////////////////////////////////////////////GET THE NUMBER OF STUDENTS////////////////////////////////////////////////////////////
        [HttpGet("StudentCount/{id}")]
        public async Task<ActionResult<int>> GetStudentCount(int id)
        {
            var studentCount = await _context.Enrollments.Where(e => e.CourseId == id).CountAsync();

            return Ok(studentCount);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////// UPLOAD IMAGE ////////////////////////////////////////////////////////////////////////
        // Upload Image
        [Authorize]
        [HttpPost("upload/{id}")]
        public async Task<ActionResult<Course>> UploadCourseImage(int id, IFormFile? file)
        {
            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            // Kiểm tra nếu file không null và có kích thước hợp lệ
            if (file != null && file.Length > 0)
            {
                // Kiểm tra định dạng file ảnh (chỉ cho phép ảnh)
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Chỉ chấp nhận các file hình ảnh (.jpg, .jpeg, .png, .gif, .webp).");
                }

                // Tạo đường dẫn để lưu ảnh
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var uploadPath = Path.Combine(_env.WebRootPath, "images", "courses");

                // Tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                // Đường dẫn đầy đủ của ảnh
                var filePath = Path.Combine(uploadPath, fileName);
                // Lưu file ảnh vào thư mục
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Xóa ảnh cũ (nếu có)
                if (!string.IsNullOrEmpty(course.Img))
                {
                    var oldImagePath = Path.Combine(_env.WebRootPath, course.Img.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }
                course.Img = "/images/courses/" + fileName;  // Lưu đường dẫn ảnh (public path)
            }

            await _context.SaveChangesAsync();

            return Ok(course);  // Trả về thông tin khóa học cùng với đường dẫn ảnh
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////GET STUDENT LIST/////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("StudentList/{id}")]
        public async Task<IActionResult> GetStudentsByCourse(int id, [FromQuery] string searchTerm = "", [FromQuery] int page = 1)
        {
            int pageSize = 5;

            var query = _context.Enrollments
                .Where(e => e.CourseId == id)
                .Join(_context.Users,
                      e => e.UserId,
                      u => u.UserId,
                      (e, u) => new { u.UserId, u.Username, u.FullName, u.Email, u.Role })
                .Where(x => x.Role == "Student");

            if (!string.IsNullOrEmpty(searchTerm))
            {
                var lowerTerm = searchTerm.ToLower();
                query = query.Where(x =>
                    x.FullName.ToLower().Contains(lowerTerm) ||
                    x.Username.ToLower().Contains(lowerTerm) ||
                    x.Email.ToLower().Contains(lowerTerm));
            }

            var totalItems = await query.CountAsync();
            var students = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                page_Size = pageSize,
                total_Items = totalItems,
                total_Pages = (int)Math.Ceiling((double)totalItems / pageSize),
                Students = students
            });
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
}
