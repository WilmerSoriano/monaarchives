# What is mapper?

- A mapper handles the convert from original database and entity java object 
(which are considered persistence) given to the **mapper** and the **mapper** gives 
this data to DTO who represent it to client. While yes, it is more decoupling.
It helps us maintain database and API separate from changing data change.
---
## Visualization

```
    [DTO -> Entity]

    Client sends data
    ↓
    BookmarkDto
    ↓
    BookmarkMapper
    ↓
    BookmarkEntity
    ↓
    Service then Repostiroy
    ↓
    Database
```

```
    [Entity -> DTO]

    Database
    ↓
    Bookmark Entity
    ↓
    BookmarkMapper
    ↓
    BookmarkDto
    ↓
    JSON response
    ↓
    Client sees the data
```

NOTE
This also applies to CreateBookmarkRequest and CreateBookmarkRequestDTO