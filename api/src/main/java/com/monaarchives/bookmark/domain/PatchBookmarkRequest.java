package com.monaarchives.bookmark.domain;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

public record PatchBookmarkRequest(String title, Integer chapter, BookmarkStatus status, String website, Integer rating) {
    
}
