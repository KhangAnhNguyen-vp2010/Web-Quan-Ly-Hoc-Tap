using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        public ScoresController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        ///////////////////////////////////////////////////////////////////GRADING ASSIGNMENT///////////////////////////////////
        [Authorize]
        [HttpPatch("GradingAssignment/{userId}/{assignmentId}/{score}")]
        public async Task<IActionResult> GradingAssignments(int userId, int assignmentId, decimal score)
        {
            var result = await _context.AssignmentsCompleteds
                       .Where(ac => ac.UserId == userId && ac.AssignmentId == assignmentId)
                       .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("Not found Assignment");
            }

            result.Grade = Math.Round(score, 1, MidpointRounding.AwayFromZero);

            await _context.SaveChangesAsync();

            return Ok(new{message = "Grading Assignment Successfully" });
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////////////GRADING TEST////////////////////////////
        [Authorize]
        [HttpPatch("GradingTest/{userId}/{testId}/{score}")]
        public async Task<IActionResult> GradingTests(int userId, int testId, decimal score)
        {
            var result = await _context.TestScores
                       .Where(ac => ac.UserId == userId && ac.TestId== testId)
                       .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("Not found Test");
            }

            result.Score = Math.Round(score, 1, MidpointRounding.AwayFromZero);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Grading Test Successfully" });
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
