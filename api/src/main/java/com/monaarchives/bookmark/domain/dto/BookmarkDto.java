/* Generic DTO, use as needed, this DTO will be used by REST API to return variables to user. */

package com.monaarchives.bookmark.domain.dto;

import java.time.Instant;
import java.util.UUID;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

public record BookmarkDto( 
    UUID id, 
    String title, 
    Integer chapter, 
    BookmarkStatus status,
    String dns, 
    String url, 
    Integer rating, 
    Instant dateCreated, 
    Instant dateUpdated, 
    Instant dateLastClicked) {
    
}
