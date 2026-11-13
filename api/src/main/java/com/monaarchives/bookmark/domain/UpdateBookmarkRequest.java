package com.monaarchives.bookmark.domain;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

// User is able to update the following arguments:
public record UpdateBookmarkRequest(String title, Integer chapter, BookmarkStatus status, String dns, String url, Integer rating) {
    
}
