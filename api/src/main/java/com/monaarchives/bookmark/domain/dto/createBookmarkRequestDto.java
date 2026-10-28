/* 
    2ND
    Main objective is to take in the raw data, verfiy it, and
    convert it into an java object.

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
    @Min(value = 0, message = ERROR_MESSAGE_MIN_LENGTH + " 0")
    @Max(value = 10000, message = ERROR_MESSAGE_MAX_LENGTH +" 10,000")
    int chapter,
    @NotNull(message = ERROR_MESSAGE_STATUS)
    BookmarkStatus status, 
    @NotBlank(message = ERROR_MESSAGE_LINK)
    String website,
    @Min(value = 0, message = ERROR_MESSAGE_MIN_LENGTH + " 0") 
    @Max(value = 5, message = ERROR_MESSAGE_MAX_LENGTH + " 5")
    int rating
) {

        private static final String ERROR_MESSAGE_TITLE_LENGTH =
        "ERROR: Title is too";

        private static final String ERROR_MESSAGE_MIN_LENGTH = 
        "ERROR: Rating must be at least";

        private static final String ERROR_MESSAGE_MAX_LENGTH = 
        "ERROR: Rating must not exceed";

        private static final String ERROR_MESSAGE_STATUS = 
        "ERROR: Status must be provided";

        private static final String ERROR_MESSAGE_LINK = 
        "ERROR: A link must be provided";
}
