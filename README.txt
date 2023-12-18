Daniela Perez
Final Project - Backend Server

==========================================================================================================
server.js
==========================================================================================================

This file contains my implementation of the backend server for my Keeper appliacation. It connects
to my MongoDB database, accesses the "notes" collection, and serves data from it to my frontend.

ENDPOINTS:
GET: Returns all note entries from the database collection.
POST: Inserts a new entry into the database collection.
DELETE: Removes an entry from the database collection. It takes the id of a note as a parameter, finds the 
corresponding note, and deletes it.

MIDDLEWARE:
The server employs body-parser and cors as middleware. Including cors and listing my application's origin
allows my application access to all endpoints implemented here. 

STATUS CODES:
The server catches all errors, and wraps them in a generic 500 error, which it returns to the requester.
This aligns with server conventions; a user does not need the specifics of the error that occurred under
the hood -- they just need to know a server-side error occurred.