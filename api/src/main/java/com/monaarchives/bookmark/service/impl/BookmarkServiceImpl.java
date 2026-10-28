/*
    3RD
    Service Layer
    Creates the entity with the data provided.
*/

package com.monaarchives.bookmark.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.UpdateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;
import com.monaarchives.bookmark.exception.BookmarkNotFoundExeception;
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

    /*
        Currently sorting in Ascending order, but will need to create a 
        dynamic sorting option for users.
    */
    @Override
    public List<Bookmark> listBookmark(){
        // For testing purpose
        return bookmarkRepository.findAll(Sort.by(Direction.ASC, "dateCreated"));
    }
    @Override 
    public Bookmark updateBookmark(UUID bookmarkId, UpdateBookmarkRequest request){
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId).orElseThrow(() -> new BookmarkNotFoundExeception(bookmarkId)); // Instead of if-statment (faster for us)

        Instant newUpdate = Instant.now();// Again, we control anything related to date/time

        bookmark.setTitle(request.title());
        bookmark.setChapter(request.chapter());
        bookmark.setStatus(request.status());
        bookmark.setWebsite(request.website());
        bookmark.setRating(request.rating());
        bookmark.setDateUpdated(newUpdate);

        return bookmarkRepository.save(bookmark);
    }
}
