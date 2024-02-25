using Microsoft.Extensions.Options;
using Website.Core;
using Website.Models;
using Website.Views;

namespace Website.Domain
{
    public class SiteService
    {
        private readonly SiteData _siteData;
        public HomeSettings Home => _siteData.Home;
        public List<ProjectSettings> Projects => _siteData.Projects;
        public AboutSettings About  => _siteData.About;
        public ColorSettings Colors => _siteData.Colors;
        public string SiteName => _siteData.Name;
        public string Name => _siteData.Name;

        private readonly Dictionary<WebsiteView, IViewModel> _defaultViewModels = [];
        public SiteService(IOptions<SiteData> siteDataOptions)
        {
            _siteData = siteDataOptions.Value;
            _defaultViewModels[HomeModel.Id] = new HomeModel { Settings = Home };
            _defaultViewModels[AboutModel.Id] = new AboutModel { Settings = About };
            _defaultViewModels[ProjectsModel.Id] = new ProjectsModel { Settings = Projects };
        }

        public bool TryGetDefaultPageModel(WebsiteView page, out IViewModel? viewModel) => _defaultViewModels.TryGetValue(page, out viewModel);
        public bool TryGetDefaultPageModel<T>(WebsiteView page, out T? viewModel) where T : IViewModel
        {
            if (TryGetDefaultPageModel(page, out var maybeViewModel))
            {
                viewModel = (T)maybeViewModel!;
                return true;
            }
            viewModel = default;
            return false;
         }

        public IViewModel GetDefaultPageModel(WebsiteView page) => _defaultViewModels[page];
        public T GetDefaultPageModel<T>(WebsiteView page) where T : IViewModel => (T)GetDefaultPageModel(page);
    }
}
