/* 
    Create bookmark request data to object class job 
    is what the REST API is going to expect in 
    order to create a bookmark, and in order to
    call our service layer (logic).

    I decouple them so service layer and REST API 
    don't touch one another. This class will handle data
    transfer
*/

package com.monaarchives.bookmark.domain.dto;

import org.hibernate.validator.constraints.Length;

import com.monaarchives.bookmark.domain.entity.BookmarkStatus;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Handle HTTPS request and transfer
public record CreateBookmarkRequestDto
(   // The notation are data-validation.
    @NotBlank (message = ERROR_MESSAGE_TITLE_LENGTH + " short")
    @Length (max = 180, message = ERROR_MESSAGE_TITLE_LENGTH + " long") 
    String title,
    @Min(value = 0, message = "Rating must be at least 0") // tesing purpose, will be changed...
    @Max(value = 10000, message = "Rating must not exceed 10,000")
    int chapter,
    @NotNull 
    BookmarkStatus status, 
    @NotBlank
    String website,
    @Min(value = 0, message = "Rating must be at least 0") // tesing purpose, will be changed...
    @Max(value = 5, message = "Rating must not exceed 5")
    int rating
) {

        private static final String ERROR_MESSAGE_TITLE_LENGTH =
        "ERROR: Title is too";
        private static final String ERROR_MESSAGE_NUMBER_LENGTH = 
        "ERROR: Invalid value";

}
