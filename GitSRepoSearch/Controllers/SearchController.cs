using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using GitSRepoSearch.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace git_repo_search.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _memoryCache;

        public SearchController(HttpClient httpClient, IMemoryCache memoryCache)
        {
            _httpClient = httpClient;
            _memoryCache = memoryCache;
        }

        [HttpGet("{query}")]
        [Authorize]

        public async Task<ActionResult<IEnumerable<Repository>>> Get(string query)
        {
            try
            {
                if (_memoryCache.TryGetValue(query, out List<Repository> cachedResults))
                {
                    return Ok(cachedResults);
                }

                var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.github.com/search/repositories?q={query}");
                request.Headers.Add("Accept", "application/vnd.github.v3+json");
                request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();

                var searchResults = JsonConvert.DeserializeObject<SearchResults>(json);

                _memoryCache.Set(query, searchResults, TimeSpan.FromMinutes(10));

                return Ok(searchResults);
                
                /*
                var repositories = searchResults.Items.Select(item => new Repository
                {

                    Id = item.Id,
                    Name = item.Name,
                    Owner = new Owner
                    {
                        avatar_url = item.Owner.avatar_url 
                    }
                }).ToList();
                */

                //return Ok(json);
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("bookmarks")]
        public ActionResult<IEnumerable<Repository>> GetBookmarks()
        {
            try
            {
                var bookmarks = HttpContext.Session.GetObject<List<Repository>>("bookmarks");
                return Ok(bookmarks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("bookmarks")]
        public ActionResult BookmarkRepository(Repository repository)
        {
            try
            {
                var bookmarks = HttpContext.Session.GetObject<List<Repository>>("bookmarks") ?? new List<Repository>();
                bookmarks.Add(repository);
                HttpContext.Session.SetObject("bookmarks", bookmarks);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}