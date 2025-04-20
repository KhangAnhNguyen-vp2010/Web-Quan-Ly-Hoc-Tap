namespace WebAPI.DTOs
{
    public class ResetPasswordDto
    {
        public string? Username { get; set; }
        public string? Otp { get; set; }
        public string? NewPassword { get; set; }

    }
}
