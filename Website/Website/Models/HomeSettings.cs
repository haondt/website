namespace Website.Models
{
    public class HomeSettings
    {
        public required string Bio { get; set; }
        public string? GitHub { get; set; }
        public string? GitLab { get; set; }
        public string? LinkedIn { get; set; }
        public required string Email { get; set; }
        public string? IconPath { get; set; }
        public int? IconHeight { get; set; }
    }
}
