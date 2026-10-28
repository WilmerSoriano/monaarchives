package com.monaarchives.bookmark.service;

import java.util.List;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkService {

    Bookmark createBookmark(CreateBookmarkRequest request);

    List<Bookmark> listBookmark();
    
}
