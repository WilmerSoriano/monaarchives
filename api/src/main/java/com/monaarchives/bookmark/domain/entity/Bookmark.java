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

    // ===========================Constructors==================================

                        // Why did we add an empty Constructor?
    public Bookmark() {} // Hibernate needs to be able to create an entity by itself.
                        // It's able to inject itself and later populate the fields from database or somewhere else.

    public Bookmark(UUID id, String title, int chapter, BookmarkStatus status, String website, int rating,
            Instant dateCreated, Instant dateUpdated, Instant dateLastClicked) {
        this.id = id;
        this.title = title;
        this.chapter = chapter;
        this.status = status;
        this.website = website;
        this.rating = rating;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.dateLastClicked = dateLastClicked;
    }

    
    // =========================Getters/Setters=================================

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getChapter() {
        return chapter;
    }

    public void setChapter(int chapter) {
        this.chapter = chapter;
    }

    public BookmarkStatus getStatus() {
        return status;
    }

    public void setStatus(BookmarkStatus status) {
        this.status = status;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Instant dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public Instant getDateLastClicked() {
        return dateLastClicked;
    }

    public void setDateLastClicked(Instant dateLastClicked) {
        this.dateLastClicked = dateLastClicked;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;

        if (obj == null)
            return false;

        if (getClass() != obj.getClass())
            return false;

        Bookmark other = (Bookmark) obj;
        
        if (id == null) {
            if (other.id != null)
                return false;
        }
        else if (!id.equals(other.id))
            return false;
        return true;
    }
}
