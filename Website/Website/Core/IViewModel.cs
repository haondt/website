using Website.Domain;

namespace Website.Core
{
    public interface IViewModel
    {
        public string ViewPath { get; }
        public static WebsiteView Id { get; }
    }
}
