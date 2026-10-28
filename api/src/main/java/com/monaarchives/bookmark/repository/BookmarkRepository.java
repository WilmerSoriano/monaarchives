/*
    This doesn't have a step.
    Repository litterly save data to database and call upon the data when neeeded.
    Used in Service layer.
    With Book repository inheriting JpaRepoisotry we get methods to access database
    and query what we want. 
*/

package com.monaarchives.bookmark.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.monaarchives.bookmark.domain.entity.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, UUID>{
    // Thx JPA for providing some methods for us :)
    // ... We might need to add some methods in the future as needed.
}
