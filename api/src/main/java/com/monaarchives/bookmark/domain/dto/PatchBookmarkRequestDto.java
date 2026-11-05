package com.monaarchives.bookmark.domain.dto;

import org.hibernate.validator.constraints.Length;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record PatchBookmarkRequestDto
(  
    @Length (max = 180, message = ERROR_MESSAGE_TITLE_LENGTH + " long") 
    String title,
    @Min(value = 0, message = ERROR_MESSAGE_MIN_LENGTH + " 0")
    @Max(value = 10000, message = ERROR_MESSAGE_MAX_LENGTH +" 10,000")
    Integer chapter,
    BookmarkStatus status, 
    String website,
    @Min(value = 0, message = ERROR_MESSAGE_MIN_LENGTH + " 0") 
    @Max(value = 5, message = ERROR_MESSAGE_MAX_LENGTH + " 5")
    Integer rating
) {

        private static final String ERROR_MESSAGE_TITLE_LENGTH =
        "ERROR: Title is too";

        private static final String ERROR_MESSAGE_MIN_LENGTH = 
        "ERROR: Rating must be at least";

        private static final String ERROR_MESSAGE_MAX_LENGTH = 
        "ERROR: Rating must not exceed";
}
