using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;

        public AssignmentsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        //[Authorize]
        [HttpGet("Course/{id}")]
        public async Task<IActionResult> GetAssignmentsByCourse(int id, [FromQuery] string? search, [FromQuery] int page = 1)
        {
            const int pageSize = 5;

            var query = _context.Assignments.Where(a => a.CourseId == id);

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(a => a.AssignmentName.Contains(search));
            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            if (page < 1 || (totalPages > 0 && page > totalPages))
                return BadRequest(new { message = "Page number out of range." });

            var list = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (list == null || list.Count == 0)
                return NotFound();

            return Ok(new
            {
                currentPage = page,
                totalPages,
                totalItems,
                items = list
            });
        }
        
    }
}
