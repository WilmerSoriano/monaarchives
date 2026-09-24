<p><a target="_blank" href="https://app.eraser.io/workspace/JsPkQfvnYXBh1gasfR7z" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

Note: The design below is my overall goal for this architecture. My main goal is to have basic RESTful API for my program, having a proper UI, and handling database. While providing 5 simple account samples. Later in future updates, I would like to in hence security with API Gateway, Middleware, and a Cache with Message Queue for constant communication with users. At the moment these are not my highest priority, However, I would like them to be consider for future features.

![Standard REST API Architecture](/.eraser/JsPkQfvnYXBh1gasfR7z___aIGbguIjZGYrfcx7gObUWAvxCc13___---diagram---JnYo954Srq_0pFwQ9rYc3---id---8QHieopL7ssJfuEqdMUn.png "Standard REST API Architecture")

## **<u>Components in order:</u>**
1. **Client UI:** Netlify, and  React + HTML + CSS
2. **Communication data:** HTTP + JSON
3. **REST API Service:** AWS, and Java + SpringBoot + JWT
4. **Database:** PostgresSQL
5. **Builder:** Docker
---

## Base JSON format**:**
Moving forward, I will be using UML as a reference and Displaying expecting result from web for the following:

URL | HTTP Verb | JSON | HTTP response code



![baseUML.png](/.eraser/JsPkQfvnYXBh1gasfR7z___aIGbguIjZGYrfcx7gObUWAvxCc13___baseUML_n3NwdhhWmeavmgApbYQ-L.png "baseUML.png")

```
{
  "id" : "r43hn-bjrb43-jir3089-vhj48ht",
  "title" : "Manhwa",
  "chapter" : 20,
  "status" : "Reading",
  "websiteURL" : "www.jonDoe.com/Manhwa/Chapter-20",
  "rating" : 3 ,
  "dateCreated" : "2026-12-20T08:00:00Z",
  "dateUpdated" : "2026-12-20T12:05:00Z",
  "dateLastClicked" : "2026-12-20T10:45:00Z"
}
```
- A Couple things to keep in mind:
1. id will be hidden from user and only be used when user clicked on manhwa, the id will display in URL bar, but not in the UI
2. title, chapter, status, and websiteURL must be added for a bookmark to be created, everything else can remain blank. I can add a null hidden from user, but used in the backend
3. the dates will not be displayed in UI, but this info is used to reference sorting as "recent read", or "recently update" from website etc...
---

## **HTTP , URL, and JSON result:**
### GET
Read a bookmark - GET /api/v1/bookmarks/r43hn-bjrb43-jir3089-vhj48ht (The id of bookmark)

Read the collection of bookmark - GET /bookmarks

Request Body - 

```
[None]
```
Response Status Code - 200 OK

### POST
Create a bookmark - POST /api/v1/bookmarks

Request Body - 

```
{
  "title" : "Manhwa",
  "chapter" : 20,
  "status" : "Reading",
  "websiteURL" : "www.jonDoe.com/Manhwa/Chapter-20",
  "dateCreated" : "2026-12-20T08:00:00Z"
}
```
Response Status Code - 201 CREATED

### PUT
Fully update a bookmark - PUT /api/v1/bookmarks/ r43hn-bjrb43-jir3089-vhj48ht

Request Body - 

```
{
  "title" : "Manhwa-2",
  "chapter" : 21,
  "status" : "Reading",
  "websiteURL" : "www.jonDoe.com/Manhwa/Chapter-21",
  "dateCreated" : "2026-12-20T08:00:00Z",
  "dateUpdated" : "2026-12-20T12:05:00Z",
}
```
Response Status Code - 200 OK

### PATCH
Partial update a bookmark -  PATCH /api/v1/bookmarks/ r43hn-bjrb43-jir3089-vhj48ht

Request Body - below is an example but individual update with title, chapter, status, and websiteURL will be used with PATCH

```
{
  "title" : "Manhwa-2"
}
```
Response Status Code - 200 OK

### DELETE
Delete a bookmark - DELETE /api/v1/bookmarks/r43hn-bjrb43-jir3089-vhj48ht

Request Body - 

```
[None]
```
Response Status Code - 204 NO CONTENT

### Errors
Response Body - Moving forward with project I will have to create multiple Errors for some possible issues. e.g user did not add the necessary requirements on POST

```
{
  "error": "Does not meet requirements"
}
```
Response Status Code - 400's


<!-- eraser-additional-content -->
<!-- eraser-additional-files -->
<a href="/docs/Design-Standard REST API Architecture-embedded-1.eraserdiagram" data-element-id="8QHieopL7ssJfuEqdMUn"></a>
<!-- end-eraser-additional-files -->
<!-- end-eraser-additional-content -->
<!--- Eraser file: https://app.eraser.io/workspace/JsPkQfvnYXBh1gasfR7z --->