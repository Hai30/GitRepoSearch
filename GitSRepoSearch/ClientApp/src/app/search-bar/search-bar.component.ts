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
        headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1BVno4UnFmY1FLaEFZeTYtdWpWcCJ9.eyJpc3MiOiJodHRwczovL2Rldi10a3RxejViM3YycGtqNHVuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJxZDFRN2NyWnZqRmhqM0NKeFd3TldGY041am14VG8yR0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9zZWFyY2gtcmVwbyIsImlhdCI6MTY4MjI1NDUzNSwiZXhwIjoxNjgzMjU0NTM1LCJhenAiOiJxZDFRN2NyWnZqRmhqM0NKeFd3TldGY041am14VG8yRyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eOOKiUlaYFbgrDAS82F_IPFO6sJHhS7MP8kVtiWMPyai7Aa2eYd49bWFAtQgHAvKrP-uLREKte-ZLBIlkEKsL2hurzITXCS6ioHGQYra3lss5gXBqVveUrx-Gg60hc5bRbT48C8BfGx8ZHGmPIGbd9lkiWv11fHqyI5j_HMvqHPxdKh92w_g4ALXskF_8MLePra0hsKkg7gfVCuDWtWUM1zZX4PgHI6QJNXmpnL14mGXbStj5Ez__fzhDYm4SEC6KD0eYC2gDQJOfUTYKmr6hbJ8S8WoNKZM77PtUt5bGGD3UpLoRkH4huOlkeZJ41SdICwEZZEDA_qDH9yaKOgjTg` },
      })
        .subscribe(res => {
          this.results = res.items; // update to assign `res.items` to `this.results`
        }, error => console.error(error));
    } 
  }

  bookmarkRepository(repository: any) {
    if (this.bookmarkService.isBookmarked(repository)) {
      console.log('Repository already bookmarked');
      return;
    }

    this.http.post<any>('http://localhost:5132/api/search/bookmarks', repository).subscribe(
      res => {
        this.bookmarkService.addBookmark(repository);
        console.log('Repository bookmarked');
      },
      error => console.error(error)
    );

    console.log(this.bookmarksArray);
  }

  clearRepositories() {
    this.results = [];
    this.keyword = '';
  }
}



