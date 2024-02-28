using Website.Core;
using Website.Domain;
using Website.Models;

namespace Website.Views
{
    public class ProjectsModel : IViewModel
    {
        public required List<ProjectSettings> Settings { get; set; }
        public static WebsiteView Id => WebsiteView.Projects;
        public string ViewPath => "/Views/Projects.cshtml";
    }
}
