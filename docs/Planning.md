<p><a target="_blank" href="https://app.eraser.io/workspace/Nc6g9b8Qg7EKm7G4MGJk" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

A User story will help me determine the main objective to complete this project and what user expect from this project.

<u>User Story</u>

===================================================================

**TA-01**: Create a bookmark mapping to comic to website

- **As a** ... manga reader enjoyer
- **I want** ... to quickly look up my series from perfer website
- **So that** ... I don't forget or bookmark website or create multiple account.
**Acceptance Criteria**
1. A User can create a bookmark
2. Each bookmark has a title of comic, website link, status of comic (color indicated), current chapter, user personal rating.
===================================================================

**TA-02**: Updated a bookmark

- **As a** ... manga reader enjoyer
- **I want** ... to quickly update a book
- **So that** ... I can keep up to date with current chapter and update the status of the overall comic
**Acceptance Criteria**
1. Users can edit the bookmark and change the title, link, status, and current chapter
2. Chapter number should be able to update itself using the https link provided letting user know current status of their own chapter with current chapter on website. (e.g reader Ch 10 /200) Where 10 is where reader left off and 200 is current status author released ch. (NOTE: since all links are different, one thing I realize they all return "chapter" follow by a dash line and chapter#. (e.g chapter-229 or comic/chapter-220).
===================================================================

**TA-03**: Delete a bookmark/Archive a bookmark

- **As a** ... manga reader enjoyer
- **I want** ... to delete or archive comic
- **So that** ... I can make more space or move it to archive if I ever decide to read it again.
**Acceptance Criteria**
1. Users can delete comic or archive their comic as they like.
2. Select multiple at a time to delete or archive (low priority but awesome feature to be added).
===================================================================

**TA-04**: Rearranging (Filter) bookmarks

- **As a** ... manga reader enjoyer
- **I want** ... to rearrange my bookmarks
- **So that** ... I can see filter my comic as needed and see my prefer comics based on fillter.
**Acceptance Criteria**
1. Users can filter comic
2. Can be filter to choose based on title, rating, recently added (date based), Last read (clicked), Updated (if comic has been updated). All given the option to be Ascending or Descending order.
3. Can be filter using status such as Plan to read, Dropped, On Hold, Completed, Reading
4. User should be able to filter Catched up vs Still reading.
---

UML - (Ignore Figure 2. Read the 1st bullet point below for more information)

Figure 1 - Represent bookmark being created.



![baseUML.png](/.eraser/Nc6g9b8Qg7EKm7G4MGJk___aIGbguIjZGYrfcx7gObUWAvxCc13___baseUML_cd8fCGhR3gbwghcLUDFKq.png "baseUML.png")



(Ignore Figure 2, Read the 1st bullet point below for more information)

Figure 2 - Filter will sort all user's bookmark, as needed based on the Sorting option. The bigger question is what is the bookmark and filter relationship?



![filterUML.png](/.eraser/Nc6g9b8Qg7EKm7G4MGJk___aIGbguIjZGYrfcx7gObUWAvxCc13___filterUML_biIzWcSsA4QblpoMBl01T.png "filterUML.png")



- Figure 1 and 2 represent a Computer Science aspect of architecture in computer science. Normally I would create 3 classes such as: 1st class handle input for the bookmarked manga, 2nd class to handle filter logic, and 3rd class to be the middle man between class 1 and 2. Handling adding/deleting all bookmarks and logic calls as needed. After much though and realization. Figure 2 and 3rd class will <u>not be necessary</u>. Both logic will be handle in the Service layer and spring framework. Which will require less work for programmer. I can therefore focus in maintaining security within program. 
- Next step is to design and adding components (adding requirements)




<!--- Eraser file: https://app.eraser.io/workspace/Nc6g9b8Qg7EKm7G4MGJk --->