package com.monaarchives.bookmark.domain.entity;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
    Reminder, to create a bookmark you MUST have
    the following:
    - title
    - chapter
    - status
    - URL
    ===================
    - date will be generated
    - everything else can be null or 0
*/

@Entity 
@Table(name = "bookmark")
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Global unique id, handle by hibernate.
    @Column (name = "id", updatable = false, nullable = false)// cannot be updated or be a null 
    private UUID id;

    @Column (name = "title", nullable = false)
    private String title;

    @Column (name = "chapter")
    private int chapter;

    @Enumerated (EnumType.STRING)
    @Column (name = "status", nullable = false)
    private BookmarkStatus status;

    @Column (name = "website", nullable = false)
    private String website;

    @Column (name = "rating") // 0-5 stars
    private int rating;

    @Column (name = "date_created", updatable = false, nullable = false)
    private Instant dateCreated;

    @Column (name = "date_updated", nullable = false)
    private Instant dateUpdated;

    @Column (name = "date_last_clicked", nullable = false)
    private Instant dateLastClicked;
}
