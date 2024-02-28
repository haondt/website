namespace Website.Models
{
    public class AboutSettings
    {
        public required string Education { get; set; }
        public SkillsSettings Skills { get; set; } = new(); 
        public string? ResumePath { get; set; }
    }
}
