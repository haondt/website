using Microsoft.Extensions.Options;
using Website.Models;

namespace Website.Styles
{
    public class StylesProvider(
        IOptions<SiteData> siteDataOptions,
        IWebHostEnvironment webHostEnvironment)
    {
        public readonly ColorSettings _colorSettings = siteDataOptions.Value.Colors;
        private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;

        public string GetStyles()
        {
            var colorsCss = ":root {\n";
            colorsCss += string.Join('\n', new List<string>
            {
                $"    --color-dark-bg: {_colorSettings.DarkBackground};",
                $"    --color-bright-bg: {_colorSettings.BrightBackground};",
                $"    --color-dark-fg: {_colorSettings.DarkForeground};",
                $"    --color-bright-fg: {_colorSettings.BrightForeground};",
                $"    --color-accent: {_colorSettings.Accent};",
            });
            colorsCss += "\n}\n";

            var baseCss = LoadFile("base.css");
            var customCss = LoadFile("style.css");

            return string.Join('\n', new List<string>
            {
                baseCss,
                colorsCss,
                customCss
            });
        }

        private string LoadFile(string fileName)
        {
            var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", fileName);
            return System.IO.File.ReadAllText(filePath);
        }
    }
}
