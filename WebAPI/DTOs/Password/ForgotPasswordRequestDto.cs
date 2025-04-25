namespace WebAPI.DTOs.Password
{
    public class ForgotPasswordRequestDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
    }
}
