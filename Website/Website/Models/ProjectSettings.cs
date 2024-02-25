namespace Website.Models
{
    public class ProjectSettings
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public List<string> Tags { get; set; } = [];
        public string? Source { get; set; }
    }
}
