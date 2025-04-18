using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;

        public AuthController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // ĐĂNG KÝ
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            {
                return BadRequest("Tài khoản đã tồn tại.");
            }
            var newUser = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = dto.Password,
                Role = "Student",
                FullName = "Học Viên Mới",
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("Đăng ký thành công.");
        }

        // ĐĂNG NHẬP
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var u = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == dto.Username && u.PasswordHash == dto.Password);

            if (u == null)
                return Unauthorized("Sai tài khoản hoặc mật khẩu.");

            return Ok("Đăng nhập thành công.");
        }
    }
}
