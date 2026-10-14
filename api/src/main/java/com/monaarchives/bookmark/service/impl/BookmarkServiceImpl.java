package com.monaarchives.bookmark.service.impl;

import java.time.Instant;

import org.springframework.stereotype.Service;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;
import com.monaarchives.bookmark.repository.BookmarkRepository;
import com.monaarchives.bookmark.service.BookmarkService;

@Service 
public class BookmarkServiceImpl implements BookmarkService{

    private final BookmarkRepository bookmarkRepository; // We need this dependency to be able to interact with database

    public BookmarkServiceImpl(BookmarkRepository bookmarkRepository){
        this.bookmarkRepository = bookmarkRepository;
    }

    @Override 
    public Bookmark createBookmark(CreateBookmarkRequest request){
        // 1st we need to get the current date right away!
    
        Instant now = Instant.now();// Given that this is the create Bookmark, by default all 3 time staps (current, updated, and lastClicked ) will be using the current time.

        Bookmark bookmark = new Bookmark(
            null,// ID is generated
            request.title(),
            request.chapter(),
            request.status(),
            request.website(),
            request.rating(),
            now,
            now,
            now
        );

        return bookmarkRepository.save(bookmark);
    }
    
}
