using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Website.Domain;

namespace Website.Controllers
{
    [Route("favicon.ico")]
    [ApiController]
    public class FaviconController(AssetProvider assetProvider) : Controller
    {

        public IActionResult Get()
        {
            if (!assetProvider.TryGetAsset("favicon.ico", out var content))
                return NotFound();
            return File(content, "image/x-icon");
        }
    }
}
