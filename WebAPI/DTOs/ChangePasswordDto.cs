using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class ChangePasswordDto
    {
        public string? CurrentPassword { get; set; }

        public string? NewPassword { get; set; }
    }
}
