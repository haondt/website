namespace Website.Models
{
    public class SiteData
    {
        public required string Name { get; set; }
        public required HomeSettings Home { get; set; }
        public required ProjectSettings Project { get; set; }
        public required AboutSettings About { get; set; }
        public required ColorSettings Colors { get; set; }
    }
}
