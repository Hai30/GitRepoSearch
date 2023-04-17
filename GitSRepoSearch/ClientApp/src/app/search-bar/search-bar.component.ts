import { Component,Inject, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../bookmark.model';
import { BookmarkService } from '../bookmark/bookmark.service';
import { AuthService } from './AuthService ';




@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
  keyword: string = '';
  results: any[] = [];
  bookmarksArray: Bookmark[] = [];


  constructor(private http: HttpClient, private bookmarkService: BookmarkService, private authService: AuthService) {
    this.results = [];

  }

  ngOnInit() {

  }

  searchRepositories() {
    const token = this.authService.getToken();
    if (this.keyword.trim() !== '') {
      this.http.get<any>('http://localhost:5132/api/search/' + this.keyword, {
        headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1BVno4UnFmY1FLaEFZeTYtdWpWcCJ9.eyJpc3MiOiJodHRwczovL2Rldi10a3RxejViM3YycGtqNHVuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJxZDFRN2NyWnZqRmhqM0NKeFd3TldGY041am14VG8yR0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9zZWFyY2gtcmVwbyIsImlhdCI6MTY4MTc0NjcyMywiZXhwIjoxNjgxODMzMTIzLCJhenAiOiJxZDFRN2NyWnZqRmhqM0NKeFd3TldGY041am14VG8yRyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.LaBTju3lDEOShd9IkI8KNQM3nS9nyNczZ-TtfO_D5E93Jka5-axrzWNnb7Z09OuRd4yjTqBYDeos6Q1qjYlrwzbPbsLWuxe293aCvTchLz2qQxZU7ZRMXcseORs4_Axh9We6Tw37AfN0iae7sj4-bkBOWrnsIODhc-H07a1YfXeJroiHkNxQ6AK3biP70ugDSkvzWjYaiBeI-TzD_U_007rM09F7Ji3Y2sWhU0NWL36Fyy7lxHFddTC2rwPsx6Zsgj7DIeQBzhwIh845mgz9aawLR9mztAzf_XnP3HJK9leIozMt7DmFeNA7TiDojjdxQ45cH4IqMB1nDbg4JQXCCg` },
      })
        .subscribe(res => {
          this.results = res.items; // update to assign `res.items` to `this.results`
        }, error => console.error(error));
    } 
  }

  bookmarkRepository(repository: any) {
    this.http.post<any>('http://localhost:5132/api/search/bookmarks', repository).subscribe(res => {
      this.bookmarkService.addBookmark(repository);
      console.log('Repository bookmarked');
    }, error => console.error(error));
    console.log(this.bookmarksArray)

  }
  clearRepositories() {
    this.results = [];
    this.keyword = '';
  }
}



