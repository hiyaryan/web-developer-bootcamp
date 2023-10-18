# Section 44: Data Relationships with Mongo

- [Mongo Relationships Intro](#mongo-relationships-intro)
- [SQL Relationships Overview](#sql-relationships-overview)
- [One-to-Few](#one-to-few)
- [One-to-Many](#one-to-many)
- [Mongoose `populate()`](#mongoose-populate)
- [One-to-"Bajillions"](#one-to-bajillions)
- [Mongo Schema Design](#mongo-schema-design)
    - [The 6 Rules of Thumb](#the-6-rules-of-thumb)
    - [Two-Way Referencing](#two-way-referencing)
    - [Database denormalization from many to one](#database-denormalization-from-many-to-one)

## Mongo Relationships Intro
Relationships in MongoDB describe how various collections in a database are connected to each other.

This [Facebook database schema diagram](https://flickr.com/photos/ikhnaton2/533233247/in/photostream/lightbox/) is an example of the relationships between the entities in Facebook's database.

<a data-flickr-embed="true" href="https://www.flickr.com/photos/ikhnaton2/533233247/in/photostream/lightbox/" title="Facebook database schema"><img src="https://live.staticflickr.com/1296/533233247_b6baa30fdb_w.jpg" width="400" height="370" alt="Facebook database schema"/></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

## SQL Relationships Overview
SQL stores data in relational databases. Relationships in SQL tables are encoded in database fields. Below, it can be determined which **User** a **Post** belongs to by the **user_id** field in the **Post** table.

| **User** |           |          |
| -------- | --------- | -------- |
| **id**   | **first** | **last** |
| 1        | Tommy     | Cash     |
| 2        | Tina      | Turner   |
| 3        | Janis     | Joplin   |

| **Post** |                       |          |          |             |
| -------- | --------------------- | -------- | -------- | ----------- |
| **id**   | **title**             | **link** | **date** | **user_id** |
| 1        | My first chicken egg! | Cash     |          | 3           |
|          |                       |          |          |             |
|          |                       |          |          |             |

Above represents a *one-to-many* relationship where one record in `User` is associated with many posts in `Post`. 

The next example below represents a *many-to-many* relationship where one `Actor` can act in many movies and one `Movie` can star many actors. The `Role` table encodes this relationship; it can be used to determine which actors played a role in which movies and which movies starred which actors.

| **Movie** |               |          |
| --------- | ------------- | -------- |
| **id**    | **title**     | **year** |
| 1         | The Favourite | 2018     |
| 2         | The Lobster   | 2015     |
| 3         | In Bruges     | 2008     |

| **Actor** |           |          |
| --------- | --------- | -------- |
| **id**    | **first** | **last** |
| 1         | Olivia    | Colman   |
| 2         | Nicholas  | Hoult    |
| 3         | Colin     | Farrell  |

| **Role**     |              |
| ------------ | ------------ |
| **movie_id** | **actor_id** |
| 1            | 1            |
| 1            | 2            |
| 2            | 1            |
| 2            | 3            |
| 3            | 3            |

## One-to-Few
In a one-to-few (or [one-to-many with embedded documents](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)) relationship in Mongo, embed the data directly in the document.

Example of one user with a few saved addresses associated with an account.
```js
{
    name: "Tommy Cash",
    savedAddresses: [
        {street: "Rahukohtu 3", city: "Tallinn", country: "Estonia"},
        {street: "Rävala 5", city: "Tallinn", country: "Estonia"},
    ]
}
```

This relationship is best defined for documents that are associated with a small number of documents.

## One-to-Many
In a one-to-many (or [one-to-many with document references](https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)) relationship in Mongo, one option is to store your data separately, but then store references to document ID's somewhere inside the parent.

Example of one farm with many produce associated with it.
```js
{
    farmName: "Full Belly Farms",
    location: "Guinda, CA",
    produce: [
        ObjectID("28197811267781"),
        ObjectID("28197811267782"),
        ObjectID("28197811267783"),
    ]
}
```

This relationship is best defined for documents that are associated with a medium number of documents.

## Mongoose [`populate()`](https://mongoosejs.com/docs/populate.html#populate)
Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query. 

Example of a Person collection referencing stories and a Story collection referencing people (or fans).
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
```

The ref option is what tells Mongoose which model to use during population.

Saving refs to other documents works the same way you normally save properties, just assign the `_id` value.
```js
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

await author.save();

const story1 = new Story({
  title: 'Casino Royale',
  author: author._id // assign the _id from the person
});

await story1.save();
// that's it!
```

Using `populate()` to populate the story's author.
```js
const story = await Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec();
// prints "The author is Ian Fleming"
console.log('The author is %s', story.author.name);
```

Populated paths are no longer set to their original `_id` , their value is replaced with the mongoose document returned from the database by performing a separate query before returning the results.

Arrays of refs work the same way. Just call the [populate](https://mongoosejs.com/docs/api/query.html#query_Query-populate) method on the query and an array of documents will be returned *in place* of the original `_id`s.

## One-to-"Bajillions"
In a one-to-"bajillions" (or [one-to-many with document references](https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)) relationship in Mongo, with thousands or more documents, it is more efficient to store a reference to the parent on the child document.

Example storing a reference to one user who may have thousands of tweets on an single tweet.
```js
{
    tweetText: "lol I just crashed my car because I was tweeting",
    tags: ["stupid", "moron", "yolo"],
    user: ObjectID("2133243243")
}
```

## Mongo Schema Design
The following sections on schema design tips are pulled from [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design). See link for full blog post.

### The 6 Rules of Thumb
- **One:** Favor embedding unless there is a compelling reason not to.
- **Two:** Needing to access an object on its own is a compelling reason not to embed it.
- **Three:** Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
- **Four:** Don’t be afraid of application-level joins: If you index correctly and use the projection specifier, then application-level joins are barely more expensive than server-side joins in a relational database.
- **Five:** Consider the read-to-write ratio with denormalization. A field that will mostly be read and only seldom updated is a good candidate for denormalization. If you denormalize a field that is updated frequently then the extra work of finding and updating all the instances of redundant data is likely to overwhelm the savings that you get from denormalization.
- **Six:** As always with MongoDB, how you model your data depends entirely on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.

### Two-way Referencing
You can combine two techniques and include both styles of reference in your schema, having both references from the “one” side to the “many” side and references from the “many” side to the “one” side.

For an example a “people” collection holding Person documents, a “tasks” collection holding Task documents, and a One-to-N relationship from Person to Task will need to track all of the Tasks owned by a Person, so we will need to reference Person to Task.

With the array of references to Task documents, a single Person document might look like the following.
```js
db.person.findOne()
{
    _id: ObjectID("AAF1"),
    name: "Kate Monster",
    tasks [     // array of references to Task documents
        ObjectID("ADF9"), 
        ObjectID("AE02"),
        ObjectID("AE73") 
        // etc
    ]
}
```

On the other hand, in some other contexts this application will display a list of Tasks (for example, all of the Tasks in a multi-person Project) and it will need to quickly find which Person is responsible for each Task. You can optimize data retrieval for this purpose by putting an additional reference to the Person in the Task document.
```js
db.tasks.findOne()
{
    _id: ObjectID("ADF9"), 
    description: "Write lesson plan",
    due_date:  ISODate("2014-04-01"),
    owner: ObjectID("AAF1")     // Reference to Person document
}
```

This design has all of the advantages and disadvantages of the “One-to-Many” schema, but with some additions. Putting in the extra "owner" reference into the Task document means that its quick and easy to find the task’s owner, but it also means that if you need to reassign the task to another person, you need to perform two updates instead of just one.

### Database denormalization from many to one
From a parts collection, you could denormalize the name of a part into a ‘parts[]’ array. For reference, here’s the version of the Product document without denormalization.
```js
{
    name : 'left-handed smoke shifter',
    manufacturer : 'Acme Corp',
    catalog_number: 1234,
    parts : [     // array of references to Part documents
        ObjectID('AAAA'),    // reference to the #4 grommet above
        ObjectID('F17C'),    // reference to a different Part
        ObjectID('D2AA'),
        // etc
    ]
}
```

Denormalization would mean that you don’t have to perform the application-level join when displaying all of the part names for the product, but you would have to perform that join if you needed any other information about a part.
```js
{
    name : 'left-handed smoke shifter',
    manufacturer : 'Acme Corp',
    catalog_number: 1234,
    parts : [
        { id : ObjectID('AAAA'), name : '#4 grommet' },         // Part name is denormalized
        { id: ObjectID('F17C'), name : 'fan blade assembly' },
        { id: ObjectID('D2AA'), name : 'power switch' },
        // etc
    ]
}
```

While making it easier to get the part names, this would add just a bit of client-side work to the application-level join:
```js
// Fetch the product document
product = db.products.findOne({catalog_number: 1234});  
// Create an array of ObjectID()s containing *just* the part numbers
part_ids = product.parts.map( function(doc) { return doc.id } );
// Fetch all the Parts that are linked to this Product
product_parts = db.parts.find({_id: { $in : part_ids } } ).toArray() ;
```

Additionally, see blog post section, *Database denormalization from one to many*, for examples on one-to-many denormalization.

In general, duplicating data where and when it is convenient for your application is normal when designing schemas.