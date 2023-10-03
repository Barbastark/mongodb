/*************************
*** Basic Terminology ***
*************************

Collection: a collection of documents. The equivalent of a table in sql.

Document: a single entry in a collection.

Field: a key/value pair in a document.
*/

/****************************
*** Mongo Shell Commands ***
****************************

mongosh -> start mongo shell

cls -> clear terminal

exit -> exit mongosh

help -> list all commands and what they do

db -> output name of current db

show dbs -> list databases

show collections -> list collections in active db

use <dbname> -> switch to or create <dbname>
*/

/*****************************************
*** Working with databases from shell ***
*****************************************

- insert single document into collection

*/

db.collection.insertOne({ title: "a title" });

/* 
  insert multiple documents into a collection 
*/

db.collection.insertMany([{ obj1 }, { obj2 }]);

/*
  prints first 20 results in the terminal.

  arguments:
    filter -> a conditional object. to only limit what fields are returned,
              pass an empty object followed by the fields object. 
    fields -> an object containing desired document fields
*/
db.collection.find(filter, fields);

//it (iterate) -> print next 20 results in terminal

/*
  find one document. in case of several matches, the first one is returned.
*/

db.collection.findOne({ author: "Kalle Stropp" });

/* 
  count returns the number of documents found.
*/

db.collection.find({ author: "Kalle Stropp" }).count();

/*
  the limit method limits the number of documents returned
  returns the first 5 results 
*/

db.collection.limit(5);

/* 
  sorting documents

  arguments
    1 -> sort in ascending order
    -1 -> sort in descending order

  the following example sorts by title in descending order
*/

db.collection.sort({ title: -1 });

/*** Nested Documents ***/

/*
 documents can be nested inside other documents 
 by using an array of objects
*/

const nestedDocuments = {
  title: "the hitchhikers guide to the galaxy",
  author: "douglas adams",
  year: 1979,
  isbn: "0-330-25864-8",
  genre: "science fiction",
  pages: 224,
  publisher: "pan books",
  image: "https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg",
  // nested documents
  reviews: [
    {
      rating: 5,
      review: "this is a great book",
    },
    {
      rating: 4,
      review: "this is a good book",
    },
  ],
};

/*** Operators ***/

/**
 * $eq -> equal
 * $ne -> not equal
 * $gt -> greater than
 * $lt -> less than
 * $gte -> greater than or equal
 * $lte -> less than or equal
 * $or -> or
 * $and -> and
 * $in -> select based on an array of values
 * $nin -> not in
 */

// find all books with more than 200 pages
db.books.find({
  pages: { $gt: 200 },
});

// find all books where pages are greater than or equal to 300
db.books.find({
  pages: { $gte: 300 },
});

// find all books where the author is "douglas adams" and pages is less than 200 and greater than 100
db.books.find({
  author: "douglas adams",
  pages: {
    $gt: 100,
    $lt: 200,
  },
});

// find all books with less than 100 pages or more than 200 pages
db.books.find({
  $or: [{ pages: { $gt: 200 } }, { pages: { $lt: 100 } }],
});

// find all books where the rating is 3, 4 or 5
db.books.find({
  rating: { $in: [3, 4, 5] },
});

// find all books where the rating is not 3, 4 or 5
db.books.find({
  rating: { $nin: [3, 4, 5] },
});
