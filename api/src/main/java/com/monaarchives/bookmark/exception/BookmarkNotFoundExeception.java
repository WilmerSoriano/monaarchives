package com.monaarchives.bookmark.exception;

import java.util.UUID;

// Unrelated to Dto, this is exception relates to Update service and database
public class BookmarkNotFoundExeception extends RuntimeException {

    private final UUID id;

    public BookmarkNotFoundExeception(UUID id){
        super(String.format("Bookmark with ID %s, does not exsit.", id));
        this.id = id;
    }
    
    public UUID getId(){
        return id;
    }

}
