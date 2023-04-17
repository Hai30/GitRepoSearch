namespace GitSRepoSearch.Models
{
    public class Repository
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Private { get; set; }

        public Owner Owner { get; set; }
    }

    public class Owner
    {
        public string avatar_url { get; set; }
    }

}
