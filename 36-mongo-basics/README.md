# Section 36: MongoDB

- [Intro to Databases](#intro-to-databases)
- [SQL vs. NoSQL Databases](#sql-vs-nosql-databases)
  - [SQL Databases](#sql-databases)
  - [NoSQL Databases](#nosql-databases)
- [Why learn MongoDB?](#why-learn-mongodb)
- [MongoDB Installation (MacOS)](#mongodb-installation-macos)
  - [Installation Summary](#installation-summary)
- [The Mongo Shell](#the-mongo-shell)
- [What is BSON?](#what-is-bson)
  - [JSON vs. BSON](#json-vs-bson)
- [Inserting with Mongo](#inserting-with-mongo)
  - [Insert a Single Document](#insert-a-single-document)
  - [Insert Multiple Documents](#insert-multiple-documents)
  - [`db.collection.insert()`](#dbcollectioninsert)
- [Finding with Mongo](#finding-with-mongo)
  - [db.collection.find()](#dbcollectionfind)
  - [db.collection.findOne()](#dbcollectionfindone)
- [Updating with Mongo](#updating-with-mongo)
  - [db.collection.updateOne()](#dbcollectionupdateone)
  - [db.collection.updateMany()](#dbcollectionupdatemany)
- [Deleting with Mongo](#deleting-with-mongo)
  - [db.collection.deleteOne()](#dbcollectiondeleteone)
  - [db.collection.deleteMany()](#dbcollectiondeletemany)
- [Additional Mongo Operators](#additional-mongo-operators)
  - [Querying Nested Elements](#querying-nested-elements)
  - [Operators](#operators)
    - [`$gt`](#gt)
    - [`$gte`](#gte)
    - [`$in`](#in)
    - [`$lt`](#lt)
    - [`$lte`](#lte)
    - [`$ne`](#ne)

## Intro to Databases
What is Mongo? 
- [Mongo](https://www.mongodb.com/docs/) is "the most popular database for modern applications". It is commonly used in combination with Node. It is a document database, which we can use to store and retrieve complex data from.

Why use a database? (Instead of just saving to a file?)
- Databases can handle large amounts of data efficiently and store it compactly.
- They provide tools for easy insertion, querying, and updating of data.
- They generally offer security features and control or management over access to data.
- They (generally) scale well.

## SQL vs. NoSQL Databases
There are two broad categories of databases, SQL and NoSQL.

### SQL Databases
SQL, Structured Query Language, databases are relational databases. A schema of tables is pre-defined before inserting any data.

Popular SQL Databases
- MySQL
- Postgres
- SQLite
- Oracle
- Microsoft SQL Server

Example of a table of Posts related to a table of Comments by `post_id`.

**Table of Posts**
| id  | author | text      |
| --- | ------ | --------- |
| 1   | colt   | blah blah |
| 2   | tyra   | hahahah   |
| 3   | jeeves | papapapa  |

**Table of Comments**
| id  | text                     | post_id |
| --- | ------------------------ | ------- |
| 1   | omg I love it!           | 3       |
| 2   | this is so funny         | 3       |
| 3   | this is not funny at all | 2       |
| 4   | please stop              | 2       |
| 5   | ughhhh                   | 2       |

### NoSQL Databases
NoSQL, Not only SQL or non-SQL, databases do not use SQL. There are many types of no-sql databases, including [document](https://en.wikipedia.org/wiki/Document-oriented_database), [key-value](https://en.wikipedia.org/wiki/Key%E2%80%93value_database), and [graph](https://en.wikipedia.org/wiki/Graph_database) stores.

Popular NoSQL Databases
- MongoDB
- Couch DB
- Neo4j
- Cassandra
- Redis

Example of data in a document data store that does not require pre-defined tables.
```
[
    {
        "id": 1,
        "author": "Colt",
        "text": "papopopa",
        "comments": [
            "asdfasd",
            "sadfasd",
            "asdfasa",
        ]
    },
    {
        "id": 2,
        "author": "Tom",
        "text": "popapapo",
    }
]
```

## Why learn MongoDB?
- Mongo is very commonly used with Node and Express (MEAN & MERN stacks).
- It's easy to get started with (though it can be tricky to truly master).
- It plays particularly well with JavaScript.
- Its popularity also means there is a strong community of developers using Mongo.

See [StackOverflow Developer Survey](https://insights.stackoverflow.com/survey/2021#most-loved-dreaded-and-wanted-database-love-dread) for insights into how MongoDB compares to other databases.

## MongoDB Installation (MacOS)
If running earlier version of macOS (tested on High Sierra macOS 10.13.6), MongoDB will have to be installed manually without homebrew, otherwise skip to the [Installation Summary](#installation-summary) below.

To install manually, follow this article, [Install MongoDB without homebrew on Mac OS](https://medium.com/khojchakra/install-mongodb-without-homebrew-on-mac-os-2a98b68ab09c).

Note that the [MongoDB Community Server Download](https://www.mongodb.com/try/download/community) that the article requires you to retrieve from the MongoDB website should be as follows,
- Version: 4.4.25
- Platform: macOS x64
- Package: tgz

Note that `mongosh` is unsupported on earlier versions of macOS.

### Installation Summary
Follow the [Install MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) instructions from the MongoDB website.

1. Install HomeBrew
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
1. Tap the [MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew)
```
$ brew tap mongodb/brew
```
1. Install MongoDB Community
```
$ brew install mongodb-community@7.0
```

How to Run and Stop
- Run MongoDB as a MacOS Service
```
brew services start mongodb-community@7.0
```
- Stop MongoDB
```
brew services stop mongodb-community@7.0
```

### How to Run and Stop in the Background
- Run MongoDB (i.e. the [mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) process) **manually as a background process** for Intel processors.
```
mongod --config /usr/local/etc/mongod.conf --fork
```
- Run MongoDB (i.e. the [mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) process) **manually as a background process** for Apple Silicon processors.
```
mongod --config /opt/homebrew/etc/mongod.conf --fork
```
- To stop a [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) running as a background process, connect to the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) using [mongosh](https://www.mongodb.com/docs/mongodb-shell/), and issue the [`shutdown`](https://www.mongodb.com/docs/manual/reference/command/shutdown/#mongodb-dbcommand-dbcmd.shutdown) command as needed.

## The [Mongo Shell](http://dochub.mongodb.org/manual/reference/program/mongo/#mongodb-binary-bin.mongo)
[mongo](http://dochub.mongodb.org/manual/reference/program/mongo/#mongodb-binary-bin.mongo) is an interactive JavaScript shell interface to MongoDB, which provides a powerful interface for system administrators as well as a way for developers to test queries and operations directly with the database. [mongo](http://dochub.mongodb.org/manual/reference/program/mongo/#mongodb-binary-bin.mongo) also provides a fully functional JavaScript environment for use with a MongoDB.

Basic Commands
- `cmd+k` key combo - clear shell
- `> help` - view list and description of top level commands
- `> db` - shows database used by default
- `> dbs` - show database names
- `> use <dbName>` - creates a new database and sets it as the default
- `ctrl+c` key combo - exit the Mongo Shell
- `> show collections` - lists the documents in the default database
- `> db.<collectionName>.find()` - view the data inside of a specific document

## What is BSON?
MongoDB stores data in BSON format both internally, and over the network, but that doesn’t mean you can’t think of MongoDB as a JSON database. Anything you can represent in JSON can be natively stored in MongoDB, and retrieved just as easily in JSON.

### [JSON vs. BSON](https://www.mongodb.com/json-and-bson)
JSON and BSON are close cousins, as their nearly identical names imply, but you wouldn’t know it by looking at them side by side. JSON, or JavaScript Object Notation, is the wildly popular standard for data interchange on the web, on which BSON (Binary JSON) is based.

|              | JSON                                         | BSON                                                                                      |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Encoding     | UTF-8 String                                 | Binary                                                                                    |
| Data Support | String, Boolean, Number, Array, Object, null | String, Boolean, Number (Integer, Float, Long, Decimal128...), Array, null, Date, BinData |
| Readability  | Human and Machine                            | Machine Only                                                                              |

#### JSON
JSON, or JavaScript Object Notation, is a human-readable data interchange format, specified in the early 2000s. Even though JSON is based on a subset of the JavaScript programming language standard, it’s completely language-independent.

Example of JSON.
```
{
  "_id": 1,
  "name": { "first" : "John", "last" : "Backus" },
  "contribs": [ "Fortran", "ALGOL", "Backus-Naur Form", "FP" ],
  "awards": [
    {
      "award": "W.W. McDowell Award",
      "year": 1967,
      "by": "IEEE Computer Society"
    }, {
      "award": "Draper Prize",
      "year": 1993,
      "by": "National Academy of Engineering"
    }
  ]
}
```

#### [BSON](http://bsonspec.org/)
BSON stands for “Binary JSON,” and that’s exactly what it was invented to be. BSON’s binary structure encodes type and length information, which allows it to be traversed much more quickly compared to JSON.

BSON adds some non-JSON-native data types, like dates and binary data, without which MongoDB would have been missing some valuable support. 

Example of JSON and its corresponding BSON.
```
{"hello": "world"} →
\x16\x00\x00\x00           // total document size
\x02                       // 0x02 = type String
hello\x00                  // field name
\x06\x00\x00\x00world\x00  // field value
\x00                       // 0x00 = type EOO ('end of object')
 
{"BSON": ["awesome", 5.05, 1986]} →
\x31\x00\x00\x00
 \x04BSON\x00
 \x26\x00\x00\x00
 \x02\x30\x00\x08\x00\x00\x00awesome\x00
 \x01\x31\x00\x33\x33\x33\x33\x33\x33\x14\x40
 \x10\x32\x00\xc2\x07\x00\x00
 \x00
 \x00
```

## [Inserting](https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/) with Mongo
MongoDB [Server](https://www.mongodb.com/docs/v4.4/) documentation should be viewed for this and the following MongoDB [CRUD operations](https://www.mongodb.com/docs/v4.4/crud/). Ensure the correct release version for the docs is selected based on the corresponding version of MongoDB on your system.

See list of [Insert Methods](https://www.mongodb.com/docs/v4.4/reference/insert-methods/). 

When inserting, mongo will create a unique identifier for the data inside of a document. This ID exists inside of the mongo object, [ObjectId](https://www.mongodb.com/docs/v4.4/reference/bson-types/#objectid).

Viewing the dogs collection in a dog document of an animalShelter database.
```
> db.dogs.find()
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
```

Note that if a document does not exist when inserting into a database, mongo will create it.

### [Insert a Single Document](https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/#insert-a-single-document)
[`Collection.insertOne()`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne) inserts a *single* [document](https://www.mongodb.com/docs/v4.4/core/document/#std-label-bson-document-format) into a collection.

The following example inserts a new document into the `inventory` collection. If the document does not specify an `_id` field, the Node.js driver adds the `_id` field with an ObjectId value to the new document. See [Insert Behavior](https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/#std-label-write-op-insert-behavior).

```
await db.collection('inventory').insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' }
});
```

### [Insert Multiple Documents](https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/#insert-multiple-documents)
`Collection.insertMany()` can insert *multiple* [documents](https://www.mongodb.com/docs/v4.4/core/document/#std-label-bson-document-format) into a collection. Pass an array of documents to the method.

The following example inserts three new documents into the `inventory` collection. If the documents do not specify an `_id` field, the Node.js driver adds the `_id` field with an ObjectId value to each document. See [Insert Behavior](https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/#std-label-write-op-insert-behavior).

```
await db.collection('inventory').insertMany([
  {
    item: 'journal',
    qty: 25,
    tags: ['blank', 'red'],
    size: { h: 14, w: 21, uom: 'cm' }
  },
  {
    item: 'mat',
    qty: 85,
    tags: ['gray'],
    size: { h: 27.9, w: 35.5, uom: 'cm' }
  },
  {
    item: 'mousepad',
    qty: 25,
    tags: ['gel', 'blue'],
    size: { h: 19, w: 22.85, uom: 'cm' }
  }
]);
```

### [`db.collection.insert()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insert/#db.collection.insert--)
Inserts a document or documents into a collection.

Returns:	
- A WriteResult object for single inserts.
- A BulkWriteResult object for bulk inserts.

#### Syntax
The [insert()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insert/#mongodb-method-db.collection.insert) method has the following syntax:
```
db.collection.insert(
   <document or array of documents>,
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

Example adding multiple dogs to the dogs collection in an animalShelter database using the `insert` method that returns a [`BulkWriteResult`](https://www.mongodb.com/docs/v4.4/reference/method/BulkWriteResult/#bulkwriteresult--).
```
> db.dogs.insert([{ "name" : "Wyatt", "age" : 14, "breed" : "Golden", "catFriendly" : false }, { "name" : "Tonya", "age" : 17, "breed" : "Chihuahua", "catFriendly" : true } ])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

Example adding one cat to a cat collection (did not exist before, created after entering the command) in an animalShelter database using the `insert` method that returns a [`WriteResult`](https://www.mongodb.com/docs/v4.4/reference/method/WriteResult/#writeresult--).
```
> db.cats.insert({name: "Blue Steele", age: 6, dogFriendly: false, breed: "Scottish fold"})
WriteResult({ "nInserted" : 1 })
```

## [Finding](https://www.mongodb.com/docs/v4.4/tutorial/query-documents/#query-documents) with Mongo
Finding a resource in a database requires it to be queried.

### [db.collection.find()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.find/)
To make queries use the `find` method find the `collection` object. `find()` selects documents in a collection or view and returns a [cursor](https://www.mongodb.com/docs/v4.4/reference/glossary/#std-term-cursor) to the selected documents.
```
db.collection.find(query, projection)
```

Without any arguments, `find()`, or equivalently `find({})`, returns every document in the collection.
```
> db.dogs.find()
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
{ "_id" : ObjectId("651fa280f4536b9e132aee56"), "name" : "Wyatt", "age" : 14, "breed" : "Golden", "catFriendly" : false }
{ "_id" : ObjectId("651fa280f4536b9e132aee57"), "name" : "Tonya", "age" : 17, "breed" : "Chihuahua", "catFriendly" : true }
```

With one argument passed to the `query` parameter, `find()` returns the queried resources.
```
> db.dogs.find({breed: "corgi"})
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }

> db.dogs.find({catFriendly: true})
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
{ "_id" : ObjectId("651fa280f4536b9e132aee57"), "name" : "Tonya", "age" : 17, "breed" : "Chihuahua", "catFriendly" : true }

> db.dogs.find({catFriendly: true, age: 17})
{ "_id" : ObjectId("651fa280f4536b9e132aee57"), "name" : "Tonya", "age" : 17, "breed" : "Chihuahua", "catFriendly" : true }
```

### [db.collection.findOne()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findOne/#db.collection.findone--)
To find one resource where multiple resources may be returned by the same query use the `findOne()` `collection` method. Returns one document that satisfies the specified query criteria on the collection or view.
```
db.collection.findOne(query, projection)
```

Find one dog from the dogs collection of the animalShelter database where `catFriendly` is `true`.
```
> db.dogs.findOne({catFriendly: true})
{
	"_id" : ObjectId("651f9ec0f4536b9e132aee55"),
	"name" : "Charlie",
	"age" : 3,
	"breed" : "corgi",
	"catFriendly" : true
}
```

## [Updating](https://www.mongodb.com/docs/v4.4/tutorial/update-documents/#update-documents) with Mongo
[`db.collection.update()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.update/#db.collection.update--) modifies an existing document or documents in a collection. The method can modify specific fields of an existing document or documents or replace an existing document entirely, depending on the update parameter.

By default, the [`db.collection.update()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.update/#mongodb-method-db.collection.update) method updates a **single** document. Include the option [`multi: true`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.update/#std-label-multi-parameter) to update all documents that match the query criteria.

#### Syntax
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>        // Available starting in MongoDB 4.2
   }
)
```

### [db.collection.updateOne()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.updateOne/#db.collection.updateone--)
Updates a single document within the collection based on the filter.

```
db.collection.updateOne(filter, update, options)
```

#### Syntax
```
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>        // Available starting in MongoDB 4.2.1
   }
)
```

Example updating the age of a dog in the dogs collection.
```
> db.dogs.updateOne({name: "Charlie"}, {$set: {age: 4}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

> db.dogs.find({"name": "Charlie"})
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 4, "breed" : "corgi", "catFriendly" : true }
```

Example adding a new element to a dog.
```
> db.dogs.updateOne({name: "Charlie"}, {$set: {color: "chocolate"}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

> db.dogs.find({"name": "Charlie"})
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 4, "breed" : "corgi", "catFriendly" : true, "color" : "chocolate" }
```

### [db.collection.updateMany()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.updateMany/#db.collection.updatemany--)
Updates all documents that match the specified filter for a collection.
```
db.collection.updateMany(filter, update, options)
```

#### Syntax
```
db.collection.updateMany(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>        // Available starting in MongoDB 4.2.1
   }
)
```

Example setting all dogs in the dogs collection that are `catFriendly` a new `isAvailable` element.
```
> db.dogs.updateMany({catFriendly: true}, {$set: {isAvailable: false}})
{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

> db.dogs.find()
{ "_id" : ObjectId("651f9ec0f4536b9e132aee55"), "name" : "Charlie", "age" : 4, "breed" : "corgi", "catFriendly" : true, "color" : "chocolate", "isAvailable" : false }
{ "_id" : ObjectId("651fa280f4536b9e132aee56"), "name" : "Wyatt", "age" : 14, "breed" : "Golden", "catFriendly" : false }
{ "_id" : ObjectId("651fa280f4536b9e132aee57"), "name" : "Tonya", "age" : 17, "breed" : "Chihuahua", "catFriendly" : true, "isAvailable" : false }
> 
```

See [Update Operators](https://www.mongodb.com/docs/v4.4/reference/operator/update/#update-operators-1) for more operations (e.g. [`$set`](https://www.mongodb.com/docs/v4.4/reference/operator/update/set/#mongodb-update-up.-set), [`$currentDate`](https://www.mongodb.com/docs/v4.4/reference/operator/update/currentDate/#mongodb-update-up.-currentDate), etc.) that can be performed on documents that are being updated.

Example using multiple operators on the cats collections.
```
> db.cats.updateOne({age: 6}, {$set: {age: 7}, $currentDate: {lastModified: true}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

> db.cats.find()
{ "_id" : ObjectId("651fa36df4536b9e132aee58"), "name" : "Blue Steele", "age" : 7, "dogFriendly" : false, "breed" : "Scottish fold", "lastModified" : ISODate("2023-10-06T17:54:21.313Z") }
```

## [Deleting](https://www.mongodb.com/docs/v4.4/tutorial/remove-documents/#delete-documents) with Mongo
### [db.collection.deleteOne()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.deleteOne/#db.collection.deleteone--)
Removes a single document from a collection.

Returns: A document containing:
- A boolean `acknowledged` as `true` if the operation ran with [write concern](https://www.mongodb.com/docs/v4.4/reference/glossary/#std-term-write-concern) or `false` if write concern was disabled
- `deletedCount` containing the number of deleted documents

#### Syntax
```
db.collection.deleteOne(
    <filter>,
    {
      writeConcern: <document>,
      collation: <document>,
      hint: <document|string>        // Available starting in MongoDB 4.4
    }
)
```

Example deleting a cat from the cats collection.
```
> db.cats.deleteOne({name: "Blue Steele"})
{ "acknowledged" : true, "deletedCount" : 1 }

> db.cats.find()
```

### [db.collection.deleteMany()](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.deleteMany/#db.collection.deletemany--)
Removes all documents that match the filter from a collection.

Returns: A document containing:
- A boolean `acknowledged` as `true` if the operation ran with [write concern](https://www.mongodb.com/docs/v4.4/reference/glossary/#std-term-write-concern) or `false` if write concern was disabled
- `deletedCount` containing the number of deleted documents

#### Syntax
```
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>
   }
)
```

Example deleting dogs from the dogs collection that were adopted.
```
> db.dogs.deleteMany({isAvailable: false})
{ "acknowledged" : true, "deletedCount" : 2 }

> db.dogs.find()
{ "_id" : ObjectId("651fa280f4536b9e132aee56"), "name" : "Wyatt", "age" : 14, "breed" : "Golden", "catFriendly" : false }
```

Example deleting everything in the dogs collection.
```
> db.dogs.deleteMany({})
{ "acknowledged" : true, "deletedCount" : 1 }

> db.dogs.find()
```

## Additional Mongo Operators
### Querying Nested Elements
To query a nested element in a document use the dot syntax.

Example querying a particular personality trait in a dogs collection.
```
db.dogs.find("personality.childFriendly": true)
```

### Operators
See [Query and Projection Operators](https://www.mongodb.com/docs/v4.4/reference/operator/query/) for an in-depth list of available query and projection operators (e.g. `$gt`, `$lt`, `$in`, etc.). Below lists the most basic of these operators and their syntax.

See [Logical Query Operators](https://www.mongodb.com/docs/v4.4/reference/operator/query-logical/#logical-query-operators) for an in-depth list of available logical query operators (e.g. `$and`, `$not`, `$or`, `$nor`) that allow you to combine operators.

See [Evaluation Query Operators](https://www.mongodb.com/docs/v4.4/reference/operator/query-logical/#logical-query-operators) for an in-depth list of available evaluation query operators (e.g. `$expr`, `$regex`, `$text`, etc.) that return data based on evaluations of either individual fields or the entire collection's documents.

#### `$gt`
[`$gt`](https://www.mongodb.com/docs/v4.4/reference/operator/query/gt/#mongodb-query-op.-gt) selects those documents where the value of the specified field is greater than (i.e. `>`) the specified value.

##### Syntax
```
{ field: { $gt: value } }
```

#### `$gte`
[`$gte`](https://www.mongodb.com/docs/v4.4/reference/operator/query/gte/#mongodb-query-op.-gte) selects the documents where the value of the specified field is greater than or equal to (i.e. `>=`) a specified value (e.g. `value`.)

##### Syntax
```
{ field: { $gte: value } }
```

#### `$in`
The [`$in`](https://www.mongodb.com/docs/v4.4/reference/operator/query/in/#mongodb-query-op.-in) operator selects the documents where the value of a field equals any value in the specified array.

##### Syntax
```
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

#### `$lt`
[`$lt`](https://www.mongodb.com/docs/v4.4/reference/operator/query/lt/#mongodb-query-op.-lt) selects the documents where the value of the `field` is less than (i.e. `<`) the specified `value`.

##### Syntax
```
{ field: { $lt: value } }
```

#### `$lte`
[`$lte`](https://www.mongodb.com/docs/v4.4/reference/operator/query/lte/#mongodb-query-op.-lte) selects the documents where the value of the `field` is less than or equal to (i.e. `<=`) the specified `value`.

##### Syntax
```
{ field: { $lte: value } }
```

#### `$ne`
[`$ne`](https://www.mongodb.com/docs/v4.4/reference/operator/query/ne/#mongodb-query-op.-ne) selects the documents where the value of the specified field is not equal to the specified value. This includes documents that do not contain the specified field.

##### Syntax
```
{ field: { $ne: value } }
```