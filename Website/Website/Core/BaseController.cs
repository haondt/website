using Microsoft.AspNetCore.Mvc;

namespace Website.Core
{
    [ApiController]
    [Produces("text/html")]
    public class BaseController : Controller
    {
        protected ViewResult View(IViewModel model)
        {
            return View(model.ViewPath, model);
        }
    }
}
