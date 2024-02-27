using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Website.Core;
using Website.Domain;
using Website.Styles;

namespace Website.Controllers
{
    [Route("assets")]
    [ApiController]
    public class AssetsController(
        AssetProvider assetProvider,
        StylesProvider stylesProvider,
        FileExtensionContentTypeProvider contentTypeProvider) : Controller
    {

        [Route("{**assetPath}")]
        public IActionResult Get(string assetPath)
        {
            if ("style.css".Equals(assetPath))
                return  Content(stylesProvider.GetStyles(), "text/css");

            if (!contentTypeProvider.TryGetContentType(assetPath, out var contentType))
                return BadRequest("Unsupported file type.");

            if (!assetProvider.TryGetAsset(assetPath, out var content))
                return NotFound();

            return File(content, contentType);
        }
    }
}
