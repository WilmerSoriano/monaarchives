/*
    2nd 1/2
    The Dto version of this file hands over the data.
    (CreateBookmarkRequestDto -> mapper-> CreateBookmarkRequest)
    So now Service layer can call create bookmark request with clean data
*/

package com.monaarchives.bookmark.domain;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

public record CreateBookmarkRequest(String title, int chapter, BookmarkStatus status, String website, int rating) {
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
