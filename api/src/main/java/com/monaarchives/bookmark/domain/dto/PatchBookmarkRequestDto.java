package com.monaarchives.bookmark.domain.dto;

import org.hibernate.validator.constraints.Length;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record PatchBookmarkRequestDto
(  
    @Length (max = 180, message = ERROR_MESSAGE_TITLE_LENGTH + " long") 
    String title,
    @Min(value = 0, message = ERROR_MESSAGE_MIN_LENGTH + " 0")
    @Max(value = 10000, message = ERROR_MESSAGE_MAX_LENGTH +" 10,000")
    Integer chapter,
    BookmarkStatus status, 
    @Size(max = 128, message = "DNS " + ERROR_MESSAGE_MAX_SIZE + " 128 Characters")
    String dns, 
    @Size(max = 1000, message = "URL " + ERROR_MESSAGE_MAX_SIZE + " 1000 Characters")
    String url,
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

        private static final String ERROR_MESSAGE_MAX_SIZE = 
        "ERROR: must not exceed";
}
