package com.monaarchives.bookmark.service;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkService {

    Bookmark createBookmark(CreateBookmarkRequest request);
    
}
