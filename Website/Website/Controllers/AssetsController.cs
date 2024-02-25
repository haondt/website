using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Website.Core;
using Website.Styles;

namespace Website.Controllers
{
    [Route("assets")]
    [ApiController]
    public class AssetsController(IWebHostEnvironment env, StylesProvider stylesProvider) : Controller
    {
        private readonly IWebHostEnvironment _env = env;
        private readonly StylesProvider _stylesProvider = stylesProvider;
        private readonly FileExtensionContentTypeProvider _contentTypeProvider = new();

        [Route("{**assetPath}")]
        public IActionResult Get(string assetPath)
        {
            if ("style.css".Equals(assetPath))
                return  Content(_stylesProvider.GetStyles(), "text/css");

            var fullPath = Path.Combine(_env.ContentRootPath, "Assets", assetPath);

            if (!System.IO.File.Exists(fullPath))
                return NotFound();

            if (!_contentTypeProvider.TryGetContentType(fullPath, out var contentType))
                return BadRequest("Unsupported file type.");

            var fileContent = System.IO.File.ReadAllBytes(fullPath);
            return File(fileContent, contentType);
        }
    }
}
