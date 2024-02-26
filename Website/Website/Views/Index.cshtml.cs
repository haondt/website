using System.Diagnostics.CodeAnalysis;
using Website.Core;
using Website.Domain;
using Website.Models;

namespace Website.Views
{
    public class IndexModel: IViewModel
    {
        public required NavigationBarModel NavigationBarModel { get; set; }
        public required string Title { get; set; }
        public required string Name { get; set; } 
        public required IViewModel ContentModel { get; set; }
        public string ViewPath => "/Views/Index.cshtml";
    }
}
