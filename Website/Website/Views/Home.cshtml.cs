using Website.Core;
using Website.Domain;
using Website.Models;

namespace Website.Views
{
    public class HomeModel : IViewModel
    {
        public string ViewPath => "/Views/Home.cshtml";
        public required HomeSettings Settings { get; set; }

        public static WebsiteView Id => WebsiteView.Home;

        public IEnumerable<ButtonLink> GetButtonLinks()
        {

            return new List<ButtonLink>
            {
                new()
                {
                    FontAwesomeClass = "fa-regular fa-envelope",
                    Url = $"mailto:{Settings.Email}",
                    Text = "contact"
                },
                new() {
                    FontAwesomeClass = "fa-brands fa-github-alt",
                    Url = Settings.GitHub,
                    Text = "github"
                },
                new()
                {
                    FontAwesomeClass = "fa-brands fa-gitlab",
                    Url = Settings.GitLab,
                    Text = "gitlab"
                },
                new()
                {
                    FontAwesomeClass = "fa-brands fa-linkedin-in",
                    Url = Settings.LinkedIn,
                    Text = "linkedin"
                },
            }.Where(bl => !string.IsNullOrEmpty(bl.Url));

        }
    }

    public struct ButtonLink
    {
        public string FontAwesomeClass { get; set; }
        public string? Url { get; set; }
        public string Text { get; set; }
    }
}
