using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public StudentsController(QuanLyHocTapContext context)
        {
            _context = context;
        }


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
    }
}
