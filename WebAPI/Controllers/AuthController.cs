using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Helpers;
using WebAPI.Models;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly IEmailService _emailService;

        public AuthController(QuanLyHocTapContext context, IOptions<JwtSettings> jwtOptions, IEmailService emailService)
        {
            _context = context;
            _jwtSettings = jwtOptions.Value;
            _emailService = emailService;
        }

        // JWT
        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };


            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Refresh Token JWT
        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var username = Request.Cookies["username"];

            if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(username))
                return Unauthorized("Thiếu token hoặc thông tin người dùng.");

            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == username &&
                u.RefreshToken == refreshToken &&
                u.RefreshTokenExpiryTime > DateTime.UtcNow);

            if (user == null)
                return Unauthorized("Token không hợp lệ hoặc đã hết hạn.");

            var newAccessToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // quan trọng nếu frontend ở domain khác
                Expires = DateTime.UtcNow.AddMinutes(10)
            };

            Response.Cookies.Append("accessToken", newAccessToken, cookieOptions);
            Response.Cookies.Append("refreshToken", newRefreshToken, cookieOptions);
            Response.Cookies.Append("username", username, cookieOptions); // Cập nhật lại

            return Ok(new
            {
                message = "Refresh token thành công"
            });
        }



        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
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
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
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
                .FirstOrDefaultAsync(u => u.Username == dto.Username);

            if (u == null || !BCrypt.Net.BCrypt.Verify(dto.Password, u.PasswordHash))
                return Unauthorized("Sai tài khoản hoặc mật khẩu.");

            var accessToken = GenerateJwtToken(u);
            var refreshToken = GenerateRefreshToken();

            // Tạo sessionId duy nhất cho mỗi phiên đăng nhập
            var sessionId = Guid.NewGuid().ToString();

            // Lưu refresh token vào DB
            u.RefreshToken = refreshToken;
            u.SessionId = sessionId;
            u.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();



            // Gửi Access Token vào HttpOnly Cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Set to true when using HTTPS
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("accessToken", accessToken, cookieOptions);
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
            Response.Cookies.Append("username", u.Username, cookieOptions);
            Response.Cookies.Append("sessionId", sessionId, cookieOptions);



            // Gửi Refresh Token trong body response
            return Ok(new
            {
                title = "Đăng nhập thành công.",
                token = accessToken,
                refresh_Token = refreshToken,
                username = u.Username,
                role = u.Role,
                session = sessionId
            });
        }


        // Log Out
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) return Unauthorized();

                var user = await _context.Users.FindAsync(int.Parse(userId));
                if (user == null) return NotFound("Người dùng không tồn tại.");

                // Kiểm tra và thay thế RefreshTokenExpiryTime nếu nó là DateTime.MinValue
                if (user.RefreshTokenExpiryTime == DateTime.MinValue)
                {
                    user.RefreshTokenExpiryTime = DateTime.Now; // Hoặc có thể là một giá trị khác hợp lệ
                }

                // Xóa refresh token và session trong DB
                user.RefreshToken = null;
                user.SessionId = null;
                await _context.SaveChangesAsync();

                // Xóa cookies ở phía client bằng cách ghi đè với cùng cấu hình và hết hạn
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(-1) // Hết hạn ngay lập tức
                };

                Response.Cookies.Append("accessToken", "", cookieOptions);
                Response.Cookies.Append("refreshToken", "", cookieOptions);
                Response.Cookies.Append("username", "", cookieOptions);
                Response.Cookies.Append("sessionId", "", cookieOptions);

                return Ok(new { message = "Đăng xuất thành công." });
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                Console.WriteLine($"Lỗi khi đăng xuất: {ex.Message}");
                return StatusCode(500, "Đã xảy ra lỗi khi đăng xuất.");
            }
        }

        // Change Password
        [Authorize]
        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var username = User.Identity?.Name;
            if (username == null)
                return Unauthorized("Không tìm thấy tên người dùng.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return NotFound("Không tìm thấy người dùng.");

            // Kiểm tra mật khẩu cũ (nếu dùng hash, cần so sánh hash)
            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            {
                return BadRequest("Mật khẩu hiện tại không đúng.");
            }

            // Hash mật khẩu mới và cập nhật
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();

            return Ok("Đổi mật khẩu thành công.");
        }


        // Forgot Password
        [HttpPost("forgot-password/request")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] ForgotPasswordRequestDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == dto.Username && u.Email == dto.Email);

            if (user == null)
                return NotFound("Thông tin không đúng.");

            // Tạo mã OTP ngẫu nhiên
            var otp = new Random().Next(100000, 999999).ToString();

            // Lưu OTP và thời gian hết hạn vào DB (hoặc cache)
            user.ResetPasswordOtp = otp;
            user.ResetPasswordExpiry = DateTime.UtcNow.AddMinutes(5);
            await _context.SaveChangesAsync();

            // Gửi OTP đến email (ví dụ dùng SendGrid, MailKit hoặc SMTP)
            await _emailService.SendEmailAsync(user.Email, "Mã OTP đặt lại mật khẩu", $"Mã OTP của bạn là: {otp}");

            return Ok("Đã gửi mã OTP đến email.");
        }

        [HttpPost("forgot-password/verify-otp")]
        public async Task<IActionResult> sendOTP([FromBody] otpDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null || user.ResetPasswordOtp != dto.Otp || user.ResetPasswordExpiry < DateTime.UtcNow)
                return BadRequest("Mã OTP không hợp lệ hoặc đã hết hạn.");


            return Ok("OTP đã được xác nhận thành công.");
        }


        [HttpPost("forgot-password/reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null)
                return BadRequest("Người dùng không tồn tại.");

            // Đổi mật khẩu mới (hash lại bằng BCrypt)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            // Xóa OTP để không tái sử dụng
            user.ResetPasswordOtp = null;
            user.ResetPasswordExpiry = null;

            await _context.SaveChangesAsync();

            return Ok("Đặt lại mật khẩu thành công.");
        }
    }
}



