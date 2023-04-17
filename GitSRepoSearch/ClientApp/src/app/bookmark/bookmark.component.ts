import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../bookmark.model';
import { BookmarkService } from './bookmark.service';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent {
  bookmarks: any[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.bookmarks = this.bookmarkService.bookmarksArray;
      console.log(this.bookmarks)
  }

}

