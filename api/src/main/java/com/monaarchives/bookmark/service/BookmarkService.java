package com.monaarchives.bookmark.service;

import java.util.List;
import java.util.UUID;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.UpdateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkService {

    Bookmark createBookmark(CreateBookmarkRequest request);

    List<Bookmark> listBookmark();

    Bookmark updateBookmark(UUID bookmarkId, UpdateBookmarkRequest request); // updateBookmark request contains all the info we want to update
    
}
