# What is DTO?
---

## DTO (Data Transfer Object)
- A Data Transfer Object is a simple Java object
used to transfer raw data between layers of our application.
---

## Steps taken by DTO

1. DTO collects raw data from the client (or request).
2. Spring automatically maps the raw data to DTO fields based on matching naming convention
3. The controller receives a completed DTO object with all data collected.
4. From the controller, it uses a mapper to map DTO to proper file to manage.
---

## Why do we do this?
- DTO helps us maintain away raw data from our RESTful API code.
We don't want raw data to touch our database or service layer. 
Instead, we use DTO (A man with gloves touching radiation), who will maintain the raw data and hold it, 
mapper (A man touching DTO radiation with a spatula on his left, and on his right using his hand to 
touch his twin brother who can give it to server layer without a problem.) will map it to correct file
who reflect what DTO performs.

## Fun logic example
- Imagine 2 twin brothers (Bookmark and BookmarkDto). Bookmark has an amazing job
who represents the entire clean data, manages it, and save it to database.
While BookmarkDto only job is to hold the raw data (not the clean data). If anyone 
touches him, they'll die. That's why mapper, the coworker, will use a spatula to 
map BookmarkDto to Bookmark data and vise verse.That way Bookmark can share the data
without anyone getting hurt.
