package com.monaarchives.bookmark.service;

import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

import com.monaarchives.bookmark.domain.CreateBookmarkRequest;
import com.monaarchives.bookmark.domain.PatchBookmarkRequest;
import com.monaarchives.bookmark.domain.UpdateBookmarkRequest;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkService {

    Bookmark createBookmark(CreateBookmarkRequest request);

    List<Bookmark> listBookmark();

    Bookmark updateBookmark(UUID bookmarkId, UpdateBookmarkRequest request); // updateBookmark request contains all the info we want to update

    Bookmark patchBookmark(UUID bookmarkId, PatchBookmarkRequest request);
    <T>void updateIfNotNull(T checkRequest, Consumer<T> setter); // little generic helper to identify updated fields vs none update fields

    void deleteBookmark(UUID bookmarkId);
    
}
