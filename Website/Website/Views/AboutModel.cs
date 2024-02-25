using Website.Core;
using Website.Domain;
using Website.Models;

namespace Website.Views
{
    public class AboutModel : IViewModel
    {
        public static AboutModel FromSiteData(SiteData siteData)
        {
            return new AboutModel { Settings = siteData.About };
        }

        public static WebsiteView Id => WebsiteView.About;

        public string ViewPath => "/Views/About.cshtml";

        public required AboutSettings Settings { get; set; }

    }
}
