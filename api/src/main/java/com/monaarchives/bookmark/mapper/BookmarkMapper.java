package com.monaarchives.bookmark.mapper;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.dto.BookmarkDto;
import com.monaarchives.bookmark.domain.dto.CreateBookmarkRequestDto;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkMapper {
    CreateBookmarkRequest fromDto(CreateBookmarkRequestDto dto); // Client to Server request

    BookmarkDto toDto(Bookmark bookmark); // Server to Client response
}
