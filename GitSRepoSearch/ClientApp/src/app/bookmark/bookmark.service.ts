import { Injectable } from '@angular/core';
import { Bookmark } from '../bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarksArray: Bookmark[] = [];

  addBookmark(bookmark: Bookmark) {
    // Check if bookmark already exists
    if (this.isBookmarked(bookmark)) {
      return;
    }

    this.bookmarksArray.push(bookmark);
  }

  isBookmarked(bookmark: Bookmark): boolean {
    return this.bookmarksArray.some((b) => b.id === bookmark.id);
  }
}

