using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs.Lesson;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;

        public LessonsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        ///////////////////////////////////////////////////////////ADD NEW LESSON///////////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLessonDto dto)
        {
            // Kiểm tra CourseID có tồn tại không
            var courseExists = await _context.Courses.AnyAsync(c => c.CourseId == dto.CourseID);
            if (!courseExists)
            {
                return BadRequest("CourseID không tồn tại.");
            }

            var lesson = new Lesson
            {
                CourseId = dto.CourseID,
                LessonName = dto.LessonName,
                LinkYoutube = dto.LinkYoutube
            };

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Thêm bài học thành công", lessonId = lesson.LessonId });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////EDIT LESSON//////////////////////////////////////////////////////////////
        [Authorize]
        [HttpPut("{lessonId}")]
        public async Task<IActionResult> UpdateLesson(int lessonId, [FromBody] UpdateLessonDto dto)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);

            if (lesson == null)
            {
                return NotFound($"Không tìm thấy bài học với ID = {lessonId}");
            }

            // Cập nhật dữ liệu
            lesson.LessonName = dto.LessonName;
            lesson.LinkYoutube = dto.LinkYoutube;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật bài học thành công" });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////GET LESSONS BY COURSE/////////////////////////////////////////////////////////////
        [Authorize]
        [HttpGet("by-course")]
        public async Task<IActionResult> GetLessonsByCourse(
    [FromQuery] int courseId,
    [FromQuery] string? search,
    [FromQuery] int page = 1)
        {
            const int PageSize = 5;

            // Kiểm tra Course có tồn tại
            var courseExists = await _context.Courses.AnyAsync(c => c.CourseId == courseId);
            if (!courseExists)
            {
                return NotFound($"Không tìm thấy khóa học với ID = {courseId}");
            }

            // Bắt đầu query
            var query = _context.Lessons
                .Where(l => l.CourseId == courseId);

            // Áp dụng tìm kiếm nếu có
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(l => l.LessonName.Contains(search));
            }

            // Tổng số bài học (để phân trang)
            var totalItems = await query.CountAsync();

            // Lấy dữ liệu theo trang
            var lessons = await query
                .OrderBy(l => l.LessonId)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Select(l => new
                {
                    l.LessonId,
                    l.LessonName,
                    l.LinkYoutube
                })
                .ToListAsync();

            // Trả kết quả cùng metadata
            return Ok(new
            {
                currentPage = page,
                totalItems,
                totalPages = (int)Math.Ceiling((double)totalItems / PageSize),
                items = lessons
            });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    }
}
