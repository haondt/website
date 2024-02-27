namespace Website.Domain
{
    public class AssetProvider(IWebHostEnvironment env, SiteService siteService)
    {
        public bool TryGetAsset(string path, out byte[] content)
        {
            var pathsToCheck = new List<string>
            {
                Path.Combine(env.ContentRootPath, path),
            };

            if (!string.IsNullOrEmpty(siteService.Assets.BasePath))
                pathsToCheck.Add(Path.Combine(siteService.Assets.BasePath, path));


            foreach (var pathToCheck in pathsToCheck)
            {
                if (System.IO.File.Exists(pathToCheck))
                {
                    content = System.IO.File.ReadAllBytes(pathToCheck);
                    return true;
                }
            }

            content = [];
            return false;
        }
    }
}
