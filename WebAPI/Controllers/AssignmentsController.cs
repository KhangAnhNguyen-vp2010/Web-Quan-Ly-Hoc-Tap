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
    }
}
