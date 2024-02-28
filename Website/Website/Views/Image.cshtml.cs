using Website.Core;
using Website.Domain;

namespace Website.Views
{
    public class ImageModel : IViewModel
    {

        public static WebsiteView Id => WebsiteView.Image;

        public string ViewPath => "/Views/Image.cshtml";

        public required string ImagePath { get; set; }
    }
}
