# Get a Web Sustainability Guideline randomized, bite sized style.

# [Live Deployment](https://wsg-o-matic.com/)

# Updated 2025-04-09

### Made with [HTML5 Boilerplate](https://html5boilerplate.com/) and the [WSG JSON API](https://github.com/w3c/sustainableweb-wsg/blob/main/guidelines.json)

#### [Check out the Draft 1.0 Web Sustainability Guidelines (WSG) online](https://w3c.github.io/sustainableweb-wsg/). 

The data used in this project is the work of many people at the W3C from the former Sustainable Web Design Community Group and current Sustainable Web Interest Group. Definitely keep an eye on the real deal and the fresh data.

### This project aims to meet as many of the 253 success criteria of the WSG's as possible.

# Current Status:

### Pre v1.0 Development: Getting it working.

The plan is to use the WSG's as I build.

Note: I have temporarily disabled the Service Worker implementation, with a no-operation service worker as a replacement for now. Caching should operate as normal, and relying on "regular" caching. 

### Commentary on Web Sustainability Guidelines's applied to this project starting with [Web Development](https://w3c.github.io/sustainableweb-wsg/star.html#web-development):

* [WD09-1](https://w3c.github.io/sustainableweb-wsg/star.html#WD09-1): Set Scripts To Load Either Asynchronously or Deferred
    * Added async tag to `app.js`
