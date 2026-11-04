package com.monaarchives.bookmark.domain;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

public record PatchBookmarkRequest(String title, int chapter, BookmarkStatus status, String website, int rating) {
    
}
