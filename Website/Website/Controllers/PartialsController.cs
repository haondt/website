using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Website.Core;
using Website.Domain;
using Website.Models;
using Website.Views;

namespace Website.Controllers
{
    [Route("partials")]
    public class PartialsController(SiteService siteService) : BaseController
    {
        [HttpGet("{page}")]
        public IActionResult GetView([FromRoute] WebsiteView page)
        {
            if (siteService.TryGetDefaultPageModel(page, out var viewModel))
                return View(viewModel!);
            return NotFound();
        }

        [HttpGet("navigationbar")]
        public IActionResult GetNavigationBar([FromQuery] WebsiteView currentView)
        {
            return View(new NavigationBarModel { CurrentView = currentView });
        }
    }
}
