package com.monaarchives.bookmark.domain.entity;

public enum BookmarkStatus {
    COMPLETED,
    READING,
    PLANNED, // PLANNED is the same as Plan to Read, this will be change in frontend for users. Backend must use PLANNED
    HIATUS,
    DROPPED,
    AXED
}
