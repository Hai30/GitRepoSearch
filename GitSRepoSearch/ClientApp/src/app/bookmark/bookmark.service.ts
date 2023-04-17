import { Injectable } from '@angular/core';
import { Bookmark } from '../bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarksArray: Bookmark[] = [];

  addBookmark(bookmark: Bookmark) {
    this.bookmarksArray.push(bookmark);
  }

}
