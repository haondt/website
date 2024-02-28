using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Website.Core;
using Website.Domain;
using Website.Models;
using Website.Views;

namespace Website.Controllers
{
    public class IndexController(SiteService siteService) : BaseController
    {

        [Route("/")]
        public IActionResult Redirect()
        {
            return Get(WebsiteView.Home);
        }

        [Route("{page}")]
        public IActionResult Get([FromRoute] WebsiteView? page)
        {
            var existingPage = page ?? WebsiteView.Home;
            return View(new IndexModel
            {
                NavigationBarModel = new NavigationBarModel { CurrentView = existingPage },
                Title = siteService.SiteName,
                Name = siteService.Name,
                ContentModel = siteService.GetDefaultPageModel(existingPage)
            });
        }
    }
}
