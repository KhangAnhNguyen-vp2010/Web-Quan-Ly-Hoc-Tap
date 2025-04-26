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
        [HttpGet("/Course/{id}")]
        public async Task<IActionResult> GetAssignmentsByCourse(int id) 
        {
            var list = await _context.Assignments.Where(a => a.CourseId == id).ToListAsync();

            if (list == null)
                return NotFound();

            return Ok(list);
        }

    }
}
