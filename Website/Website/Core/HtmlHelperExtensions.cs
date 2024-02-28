using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Website.Core
{
    public static class HtmlHelperExtensions
    {
        public static Task<IHtmlContent> PartialAsync(this IHtmlHelper html, IViewModel model)
        {
            return html.PartialAsync(model.ViewPath, model);
        }
    }
}
