using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
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



        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

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


        // DELETE: api/Courses/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }


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
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Chỉ chấp nhận các file hình ảnh (.jpg, .jpeg, .png, .gif).");
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


    }
}
