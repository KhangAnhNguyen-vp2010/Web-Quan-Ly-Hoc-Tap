using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs.Password
{
    public class ChangePasswordDto
    {
        public string? CurrentPassword { get; set; }

        public string? NewPassword { get; set; }
    }
}
