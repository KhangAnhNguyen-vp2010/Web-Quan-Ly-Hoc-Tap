﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QuanLyHocTapContext _context;

        public UsersController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("userinfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var username = User.Identity?.Name; // Từ JWT claim 'Name'

            if (username == null)
                return Unauthorized("Không tìm thấy tên người dùng.");

            var user = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => new UserInfoDto
                {
                    FullName = u.FullName,
                    Email = u.Email,
                    Role = u.Role
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound("Không tìm thấy người dùng.");

            return Ok(user);
        }


    }
}
