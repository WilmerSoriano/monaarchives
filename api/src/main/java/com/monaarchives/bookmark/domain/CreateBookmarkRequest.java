package com.monaarchives.bookmark.domain;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

/*
    As a reminder, to create a bookmark
    users MUST enter the following:
    - title
    - chapter
    - status
    - URL
    ===================
    - date will be generated
    - everything else can be null or 0
*/
public record CreateBookmarkRequest(String title, int chapter, BookmarkStatus status, String website) {
    /*
        For context:
        Record class provides the following:
            * constructor
            * getters/accessors
            * equals()
            * hashCode()
            * toString()
        With the parameters above and record class also holds data
        and makes them final for the parameter. So useful for DTO between entity
        and Service layer.
    */
}
