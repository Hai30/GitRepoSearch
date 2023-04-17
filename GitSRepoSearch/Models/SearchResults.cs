using System.Collections.Generic;

namespace GitSRepoSearch.Models
{
    public class SearchResults
    {
        public List<SearchResultItem> Items { get; set; }
    }

    public class SearchResultItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Private { get; set; }

        public OwnerInfo Owner { get; set; }
    }

    public class OwnerInfo
    {
        public string avatar_url { get; set; }
    }
}
