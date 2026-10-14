# What is domain?

- The domain folder is the subject of my application. Think of it like this.
What is my application about and data it works with? Since my application manages bookmarks, a domain might include:
* Bookmarks
* title
* Website
* creating bookmarks
* etc...
Domain is in charge of grouping classes related to application's core concept and data associated.
This allows Controller, Service, and Repository layer to call upon a class in domain if needed.
