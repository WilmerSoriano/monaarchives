/*   
    1ST 
    Entry point of HTTP Request & Response.
    Not reponsible for direct data saving
*/

package com.monaarchives.bookmark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.dto.BookmarkDto;
import com.monaarchives.bookmark.domain.dto.CreateBookmarkRequestDto;
import com.monaarchives.bookmark.domain.entity.Bookmark;
import com.monaarchives.bookmark.mapper.BookmarkMapper;
import com.monaarchives.bookmark.service.BookmarkService;

import jakarta.validation.Valid;

@RestController
@RequestMapping (path="/api/v1/bookmarks")
public class BookmarkController {
    
    private final BookmarkService bookmarkService; // interact with serivce layer
    private final BookmarkMapper bookmarkMapper; // to take object owned by presentation layer to interact with service layer

    public BookmarkController(BookmarkService bookmarkService, BookmarkMapper bookmarkMapper) {
        this.bookmarkService = bookmarkService;
        this.bookmarkMapper = bookmarkMapper;
    }

    @PostMapping // speceficy this method handles HTTP post request as HTTP method request.
    // This method allows me to control HTTP response, in this case the response to creating a bookmark, and return type ResponseEntity of BookmarkDTO
    public ResponseEntity<BookmarkDto> createBookmark(
        @Valid @RequestBody CreateBookmarkRequestDto createBookmarkRequestDto
    ){ // Valid annotation uses our parameter rules to validate and RequestBody also uses parameter rules to convert JSON into object. 
        
        CreateBookmarkRequest createBookmarkRequest = bookmarkMapper.fromDto(createBookmarkRequestDto); // 1st take dto and map it to an object.(createBookmarkRequestDto -> CreateBookmarkRequest)

        Bookmark bookmark = bookmarkService.createBookmark(createBookmarkRequest); // 2nd now we can pass it to service layer.

        BookmarkDto createBookmarkDto = bookmarkMapper.toDto(bookmark); // 3rd now we can return this as a Response

        return new ResponseEntity<>(createBookmarkDto, HttpStatus.CREATED); // return all variables and display code 200
        
    }
}
