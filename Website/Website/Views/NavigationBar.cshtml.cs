using Website.Core;
using Website.Domain;

namespace Website.Views
{
    public class NavigationBarModel : IViewModel
    {
        public static WebsiteView Id => WebsiteView.NavigationBar;
        public required WebsiteView CurrentView { get; set; }
        public string ViewPath => "/Views/NavigationBar.cshtml";

        public List<WebsiteView> WebsiteViews { get; } = new List<WebsiteView>
        {
            WebsiteView.Home,
            WebsiteView.About,
            WebsiteView.Projects,
        };
    }
}
