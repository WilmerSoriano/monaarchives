/* 
    2nd/4th

    Mapper job is incharge of mapping the following:
    convert raw data(dto) to object (Durring 1st process)
    object to data(dto). (During 4th process)
    [Map struct library exsit to simplify this process...
    coming soon in next update]
*/
package com.monaarchives.bookmark.mapper.impl;

import org.springframework.stereotype.Component;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.UpdateBookmarkRequest;
import com.monaarchives.bookmark.domain.dto.BookmarkDto;
import com.monaarchives.bookmark.domain.dto.CreateBookmarkRequestDto;
import com.monaarchives.bookmark.domain.dto.UpdateBookmarkRequestDto;
import com.monaarchives.bookmark.domain.entity.Bookmark;
import com.monaarchives.bookmark.mapper.BookmarkMapper;

@Component 
public class BookmarkMapperImpl implements BookmarkMapper {

    @Override
    public CreateBookmarkRequest fromDto(CreateBookmarkRequestDto dto) {
        return new CreateBookmarkRequest(
            dto.title(),
            dto.chapter(),
            dto.status(),
            dto.website(),
            dto.rating()
        );
    }

    @Override
    public UpdateBookmarkRequest fromDto(UpdateBookmarkRequestDto dto) {
        return new UpdateBookmarkRequest(
            dto.title(),
            dto.chapter(),
            dto.status(),
            dto.website(),
            dto.rating()
        );
    }

    @Override
    public BookmarkDto toDto(Bookmark bookmark) {
        return new BookmarkDto(
            bookmark.getId(),
            bookmark.getTitle(),
            bookmark.getChapter(),
            bookmark.getStatus(),
            bookmark.getWebsite(),
            bookmark.getRating(),
            bookmark.getDateCreated(),
            bookmark.getDateUpdated(),
            bookmark.getDateLastClicked()
        );
    }
    
}
