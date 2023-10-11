# Section 37: Connecting to Mongo with Mongoose

- [Mongoose Intro](#mongoose-intro)
- [Connecting Mongoose to Mongo](#connecting-mongoose-to-mongo)
- [Mongoose Model](#mongoose-model)
- [Insert Many](#insert-many)
- [Finding with Mongoose](#finding-with-mongoose)
  - [find()](#find)
  - [findById()](#findbyid)
  - [findOne()](#findone)
- [Updating with Mongoose](#updating-with-mongoose)
  - [updateOne()](#updateone)
  - [updateMany()](#updatemany)
  - [findOneAndUpdate()](#findoneandupdate)
- [Deleting with Mongoose](#deleting-with-mongoose)
  - [deleteOne](#deleteone)
  - [deleteMany](#deletemany)
  - [findOneAndDelete()](#findoneanddelete)
- [Mongoose Schema Validations](#mongoose-schema-validations)
- [Additional Schema Constraints](#additional-schema-constraints)
  - [SchemaTypes](#schematypes)
  - [SchemaType Options](#schematype-options)
- [Validating Mongoose Updates](#validating-mongoose-updates)
- [Mongoose Validation Errors](#mongoose-validation-errors)
- [Model Instance Methods](#model-instance-methods)
- [Adding Model Static Methods](#adding-model-static-methods)
- [Mongoose Virtuals](#mongoose-virtuals)
- [Defining Mongoose Middleware](#defining-mongoose-middleware)
  - [Pre](#pre)
  - [Post](#post)

## Mongoose Intro
[Mongoose](https://mongoosejs.com/) is an ODM. It connects Node to MongoDB and provides functionality on the JavaScript side.

ODMs, Object Data/Document Mappers, like Mongoose, map documents coming from a database into usable JavaScript objects.

Mongoose provides ways for us to model out our applications data and define a schema. It offers easy ways to validate data and build complex queries from the comfort of JS.

Note: ORM, Object Relational Mapper, provides the same functionality as ODMs but connects SQL databases as opposed to NoSQL databases like MongoDB.

## Connecting Mongoose to Mongo
[Mongoose](https://www.npmjs.com/package/mongoose) needs to installed using NPM.
```
npm i mongoose
```

Connect Mongo `test` database to JavaScript app, create a Cat model, then create a new Cat based on the schema. Print `meow` if the Cat object was crated successfully.
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

### [Operation Buffering](https://mongoosejs.com/docs/connections.html#buffering)
Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB
```
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const MyModel = mongoose.model('Test', new Schema({ name: String }));
// Works
await MyModel.findOne();
```

This is because mongoose buffers model function calls internally. This buffering is convenient, but also a common source of confusion. Mongoose will not throw any errors by default if you use a model without connecting.
```
const MyModel = mongoose.model('Test', new Schema({ name: String }));
const promise = MyModel.findOne();

setTimeout(function() {
  mongoose.connect('mongodb://127.0.0.1:27017/myapp');
}, 60000);

// Will just hang until mongoose successfully connects
await promise;
```

To disable buffering, turn off the bufferCommands option on your schema. If you have bufferCommands on and your connection is hanging, try turning bufferCommands off to see if you haven't opened a connection properly. You can also disable bufferCommands globally:
```
mongoose.set('bufferCommands', false);
```

Note: To load a file into a node REPL, use `.load <filename>`. Loading a file into a node REPL executes the file inside of the node environment.

## [Mongoose Model](https://mongoosejs.com/docs/models.html)
The [Mongoose Model API](https://mongoosejs.com/docs/api/model.html) offers a list of methods that every Mongoose model has access to.

In order to access the the methods provided my a Mongoose model requires the creation of a [Schema](https://mongoosejs.com/docs/guide.html).

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```

To use our schema definition, we need to convert our `blogSchema` into a [Model](https://mongoosejs.com/docs/models.html) we can work with. To do so, we pass it into `mongoose.model(modelName, schema)`
```
const Blog = mongoose.model('Blog', blogSchema);
```

To create a new object from the model, create it in the same way an object is instantiated in JavaScript.
```
const blog1 = new Blog({title: "First Blog", author: "Ryan", ...})
```

Save the object as a document to a Mongo database using the `save()` method on the Model object.
```
blog1.save()
```

## Insert Many
To insert many objects as documents into a mongo database, use the Model method [`insertMany`](https://mongoosejs.com/docs/api/model.html#Model.insertMany()).

```
await Movies.insertMany([
  { name: 'Star Wars' },
  { name: 'The Empire Strikes Back' }
]);
```

Note that this function does not trigger save middleware. This means that `save()` does not need to be called to save the data to the database, i.e., data is saved using `insertMany` so long as a promise is returned.

## Finding with Mongoose
To find documents in a mongo database, use the Model methods [`find()`](https://mongoosejs.com/docs/api/model.html#Model.find()), [`findById()`](https://mongoosejs.com/docs/api/model.html#Model.findById()), [`findOne()`](https://mongoosejs.com/docs/api/model.html#Model.findOne()).

The find methods listed below (including many more listed in the docs) return [Query](https://mongoosejs.com/docs/queries.html) objects that contain the queried data. A Query can be used as a promise but [Queries are not promises](https://mongoosejs.com/docs/queries.html#queries-are-not-promises) but [thenables](https://masteringjs.io/tutorials/fundamentals/thenable).

### [`find()`](https://mongoosejs.com/docs/api/model.html#Model.find())
Finds documents.

```
// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```

### [`findById()`](https://mongoosejs.com/docs/api/model.html#Model.findById())
Finds a single document by its _id field. `findById(id)` is almost equivalent to `findOne({ _id: id })`. If you want to query by a document's `_id`, use `findById()` instead of `findOne()`.

```
// Find the adventure with the given `id`, or `null` if not found
await Adventure.findById(id).exec();

// select only the adventures name and length
await Adventure.findById(id, 'name length').exec();
```

### [`findOne()`](https://mongoosejs.com/docs/api/model.html#Model.findOne())
Finds one document.

```
// Find one adventure whose `country` is 'Croatia', otherwise `null`
await Adventure.findOne({ country: 'Croatia' }).exec();

// Model.findOne() no longer accepts a callback

// Select only the adventures name and length
await Adventure.findOne({ country: 'Croatia' }, 'name length').exec();
```

## Updating with Mongoose
To update documents in a mongo database, use the Model methods [`updateOne()`](https://mongoosejs.com/docs/api/model.html#Model.updateOne()),  [`updateMany()`](https://mongoosejs.com/docs/api/model.html#Model.updateMany()), [`findOneAndUpdate()`](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()).


### [`updateOne()`](https://mongoosejs.com/docs/api/model.html#Model.updateOne())
Update only the first document that matches filter.

```
const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
res.matchedCount; // Number of documents matched
res.modifiedCount; // Number of documents modified
res.acknowledged; // Boolean indicating everything went smoothly.
res.upsertedId; // null or an id containing a document that had to be upserted.
res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
```

### [`updateMany()`](https://mongoosejs.com/docs/api/model.html#Model.updateMany())
Same as updateOne(), except MongoDB will update all documents that match filter (as opposed to just the first one) regardless of the value of the multi option.

```
const res = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
res.matchedCount; // Number of documents matched
res.modifiedCount; // Number of documents modified
res.acknowledged; // Boolean indicating everything went smoothly.
res.upsertedId; // null or an id containing a document that had to be upserted.
res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
```

### [`findOneAndUpdate()`](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate())
Issues a mongodb findOneAndUpdate command.

Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback. The query executes if callback is passed else a Query object is returned.

Syntax
```
A.findOneAndUpdate(conditions, update, options)  // returns Query
A.findOneAndUpdate(conditions, update)           // returns Query
A.findOneAndUpdate()                             // returns Query
```

Example
```
const query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason bourne' }, options)

// is sent as
Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options)
```

## Deleting with Mongoose
To delete documents in a mongo database, use the Model methods [`deleteOne()`](https://mongoosejs.com/docs/api/model.html#Model.deleteOne()),  [`deleteMany()`](https://mongoosejs.com/docs/api/model.html#Model.deleteMany()), [`findOneAndDelete()`](https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()).

### [`deleteOne()`](https://mongoosejs.com/docs/api/model.html#Model.deleteOne())
Deletes the first document that matches conditions from the collection. It returns an object with the property deletedCount indicating how many documents were deleted. Behaves like remove(), but deletes at most one document regardless of the single option.

```
await Character.deleteOne({ name: 'Eddard Stark' }); // returns {deletedCount: 1}
```

### [`deleteMany()`](https://mongoosejs.com/docs/api/model.html#Model.deleteMany())
Deletes all of the documents that match conditions from the collection. It returns an object with the property deletedCount containing the number of documents deleted. Behaves like remove(), but deletes all documents that match conditions regardless of the single option.

```
await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }); // returns {deletedCount: x} where x is the number of documents deleted.
```

### [`findOneAndDelete()`](https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete())
Issue a MongoDB `findOneAndDelete()` command.

Finds a matching document, removes it, and returns the found document (if any).

This function triggers the middleware, `findOneAndDelete()`

This function differs slightly from `Model.findOneAndRemove()` in that `findOneAndRemove()` becomes a [MongoDB `findAndModify()` command](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/), as opposed to a `findOneAndDelete()` command. For most mongoose use cases, this distinction is purely pedantic. You should use `findOneAndDelete()` unless you have a good reason not to.

Syntax
```
A.findOneAndDelete(conditions, options)  // return Query
A.findOneAndDelete(conditions) // returns Query
A.findOneAndDelete()           // returns Query
```

Example
```
const doc = await Model.findById(id)
doc.name = 'jason bourne';
await doc.save();
```

## Mongoose [Schema Validations](https://mongoosejs.com/docs/validation.html)
Creating schema validations requires writing an expanded form of a schema to include built-in validations that come with Mongoose.

Shop schema with validations.
```
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
});
```

Shop schema without validation.
```
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});
```

### Validation Rules
- Validation is defined in the [SchemaType](https://mongoosejs.com/docs/schematypes.html)
- Validation is [middleware](https://mongoosejs.com/docs/middleware.html). Mongoose registers validation as a `pre('save')` hook on every schema by default.
- Validation always runs as the **first** `pre('save')` hook. This means that validation doesn't run on any changes you make in `pre('save')` hooks.
- You can disable automatic validation before save by setting the [validateBeforeSave](https://mongoosejs.com/docs/guide.html#validateBeforeSave) option
- You can manually run validation using `doc.validate()` or `doc.validateSync()`
- You can manually mark a field as invalid (causing validation to fail) by using `doc.invalidate(...)`
- Validators are not run on undefined values. The only exception is the `required` [validator](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-required).
- When you call [Model#save](https://mongoosejs.com/docs/api/model.html#model_Model-save), Mongoose also runs subdocument validation. If an error occurs, your [Model#save](https://mongoosejs.com/docs/api/model.html#model_Model-save) promise rejects
- Validation is customizable

```
const schema = new Schema({
  name: {
    type: String,
    required: true
  }
});
const Cat = db.model('Cat', schema);

// This cat has no name :(
const cat = new Cat();

let error;
try {
  await cat.save();
} catch (err) {
  error = err;
}

assert.equal(error.errors['name'].message,
  'Path `name` is required.');

error = cat.validateSync();
assert.equal(error.errors['name'].message,
  'Path `name` is required.');
```

## Additional Schema Constraints
### [SchemaTypes](https://mongoosejs.com/docs/schematypes.html#schematypes)
SchemaTypes handle definition of path [defaults](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-default), [validation](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-validate), [getters](https://mongoosejs.com/docs/schematypes.html#getters), [setters](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-set), [field selection defaults](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-select) for [queries](https://mongoosejs.com/docs/api/query.html), and other general characteristics for Mongoose document properties.

You can think of a Mongoose schema as the configuration object for a Mongoose model. A [SchemaType](https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype) is then a configuration object for an individual property. A SchemaType says what type a given path should have, whether it has any getters/setters, and what values are valid for that path.

```
const schema = new Schema({ name: String });
schema.path('name') instanceof mongoose.SchemaType; // true
schema.path('name') instanceof mongoose.Schema.Types.String; // true
schema.path('name').instance; // 'String'
```

The following are all the valid SchemaTypes in Mongoose. Mongoose plugins can also add custom SchemaTypes like [int32](http://plugins.mongoosejs.io/plugins/int32). Check out [Mongoose's plugins search](http://plugins.mongoosejs.io/) to find plugins.
- [String](https://mongoosejs.com/docs/schematypes.html#strings)
- [Number](https://mongoosejs.com/docs/schematypes.html#numbers)
- [Date](https://mongoosejs.com/docs/schematypes.html#dates)
- [Buffer](https://mongoosejs.com/docs/schematypes.html#buffers)
- [Boolean](https://mongoosejs.com/docs/schematypes.html#booleans)
- [Mixed](https://mongoosejs.com/docs/schematypes.html#mixed)
- [ObjectId](https://mongoosejs.com/docs/schematypes.html#objectids)
- [Array](https://mongoosejs.com/docs/schematypes.html#arrays)
- [Decimal128](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Decimal128)
- [Map](https://mongoosejs.com/docs/schematypes.html#maps)
- [Schema](https://mongoosejs.com/docs/schematypes.html#schemas)
- [UUID](https://mongoosejs.com/docs/schematypes.html#uuid)
- [BigInt](https://mongoosejs.com/docs/schematypes.html#bigint)

Example
```
const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
});

// example use

const Thing = mongoose.model('Thing', schema);

const m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push('strings!');
m.ofNumber.unshift(1, 2, 3, 4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);
m.save(callback);
```

### [SchemaType Options](https://mongoosejs.com/docs/schematypes.html#schematype-options)
You can declare a schema type using the type directly, or an object with a `type` property.
```
const schema1 = new Schema({
  test: String // `test` is a path of type String
});

const schema2 = new Schema({
  // The `test` object contains the "SchemaType options"
  test: { type: String } // `test` is a path of type string
});
```

In addition to the type property, you can specify additional properties for a path.

Lowercase a string before saving.
```
const schema2 = new Schema({
  test: {
    type: String,
    lowercase: true // Always convert `test` to lowercase
  }
});
```

#### All Schema Types
- `required`: boolean or function, if true adds a [required validato](https://mongoosejs.com/docs/validation.html#built-in-validators)r for this property
- `default`: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
- `select`: boolean, specifies default [projections](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) for queries
- `validate`: function, adds a [validator function](https://mongoosejs.com/docs/validation.html#built-in-validators) for this property
- `get`: function, defines a custom getter for this property using [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
- `set`: function, defines a custom setter for this property using [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
- `alias`: string, mongoose >= 4.10.0 only. Defines a [virtual](https://mongoosejs.com/docs/guide.html#virtuals) with the given name that gets/sets this path.
- `immutable`: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has `isNew: true`.
- `transform`: function, Mongoose calls this function when you call [`Document#toJSON()`](https://mongoosejs.com/docs/api/document.html#document_Document-toJSON) function, including when you [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript) a document.
```
const numberSchema = new Schema({
  integerOnly: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  }
});

const Number = mongoose.model('Number', numberSchema);

const doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly; // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 3
```

See docs for a list of options available for each individual Schema Type (e.g. `lowercase`, `uppercase`, `trim` for `String`, and `min`, `max` for `Number`).

## Validating Mongoose Updates
Schema validations are applied only when creating new documents. When updating a document, mongoose needs to be explicitly told to cross over the constraints with the update.

For Model update methods like [`findOneAndUpdate()`](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()), the `runValidators` should be set to true to validate that the new data respects the schema constraints.

- `[options.runValidators]` «Boolean» if `true`, runs [update validators](https://mongoosejs.com/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema

## Mongoose Validation Errors
Mongoose allows custom validator error messages to be created when using built-in validators.

### [Built-in Validators](https://mongoosejs.com/docs/validation.html#built-in-validators)

Mongoose has several built-in validators.
- All [SchemaTypes](https://mongoosejs.com/docs/schematypes.html) have the built-in [required](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-required) validator. The required validator uses the [SchemaType's checkRequired() function](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-checkRequired) to determine if the value satisfies the required validator.
- [Numbers](https://mongoosejs.com/docs/schematypes.html#numbers) have [min and max](https://mongoosejs.com/docs/schematypes.html#number-validators) validators.
- [Strings](https://mongoosejs.com/docs/schematypes.html#strings) have [enum, match, minLength, and maxLength](https://mongoosejs.com/docs/schematypes.html#string-validators) validators.

Each of the validator links above provide more information about how to enable them and customize their error messages.

```
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});
const Breakfast = db.model('Breakfast', breakfastSchema);

const badBreakfast = new Breakfast({
  eggs: 2,
  bacon: 0,
  drink: 'Milk'
});
let error = badBreakfast.validateSync();
assert.equal(error.errors['eggs'].message,
  'Too few eggs');
assert.ok(!error.errors['bacon']);
assert.equal(error.errors['drink'].message,
  '`Milk` is not a valid enum value for path `drink`.');

badBreakfast.bacon = 5;
badBreakfast.drink = null;

error = badBreakfast.validateSync();
assert.equal(error.errors['drink'].message, 'Path `drink` is required.');

badBreakfast.bacon = null;
error = badBreakfast.validateSync();
assert.equal(error.errors['bacon'].message, 'Why no bacon?');
```

### [Custom Error Messages](https://mongoosejs.com/docs/validation.html#custom-error-messages)

You can configure the error message for individual validators in your schema. There are two equivalent ways to set the validator error message:

- Array syntax: `min: [6, 'Must be at least 6, got {VALUE}']`
- Object syntax: `enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }`

Mongoose also supports rudimentary templating for error messages. Mongoose replaces `{VALUE}` with the value being validated.
```
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Must be at least 6, got {VALUE}'],
    max: 12
  },
  drink: {
    type: String,
    enum: {
      values: ['Coffee', 'Tea'],
      message: '{VALUE} is not supported'
    }
  }
});
const Breakfast = db.model('Breakfast', breakfastSchema);

const badBreakfast = new Breakfast({
  eggs: 2,
  drink: 'Milk'
});
const error = badBreakfast.validateSync();
assert.equal(error.errors['eggs'].message,
  'Must be at least 6, got 2');
assert.equal(error.errors['drink'].message, 'Milk is not supported');
```

## Model Instance Methods
Mongoose provides a way to add [instance methods](https://mongoosejs.com/docs/guide.html#methods) to a schema.

Instances of `Models` are [documents](https://mongoosejs.com/docs/documents.html). Documents have many of their own [built-in instance methods](https://mongoosejs.com/docs/api/document.html). We may also define our own custom document instance methods.
```
// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "methods" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
    methods: {
      findSimilarTypes(cb) {
        return mongoose.model('Animal').find({ type: this.type }, cb);
      }
    }
  });

// Or, assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb);
};
```

Now all of our `animal` instances have a `findSimilarTypes` method available to them.
```
const Animal = mongoose.model('Animal', animalSchema);
const dog = new Animal({ type: 'dog' });

dog.findSimilarTypes((err, dogs) => {
  console.log(dogs); // woof
});
```

Note
- Overwriting a default mongoose document method may lead to unpredictable results. See [this](https://mongoosejs.com/docs/api/schema.html#schema_Schema-reserved) for more details.
- The example above uses the `Schema.methods` object directly to save an instance method. You can also use the `Schema.method()` helper as described [here](https://mongoosejs.com/docs/api/schema.html#schema_Schema-method).
- Do not declare methods using ES6 arrow functions (`=>`). Arrow functions [explicitly prevent binding `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this), so your method will not have access to the document and the above examples will not work.

## Adding Model [Static Methods](https://mongoosejs.com/docs/guide.html#statics)
Static methods deal with the collection in general, as opposed to individual documents of the collection with instance methods.

You can also add static functions to your model. There are three equivalent ways to add a static:
- Add a function property to the second argument of the schema-constructor (`statics`)
- Add a function property to `schema.statics`
- Call the [`Schema#static()` function](https://mongoosejs.com/docs/api/schema.html#schema_Schema-static)

```
// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "statics" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, 'i') });
      }
    }
  });

// Or, Assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};
// Or, equivalently, you can call `animalSchema.static()`.
animalSchema.static('findByBreed', function(breed) { return this.find({ breed }); });

const Animal = mongoose.model('Animal', animalSchema);
let animals = await Animal.findByName('fido');
animals = animals.concat(await Animal.findByBreed('Poodle'));
```

Do not declare statics using ES6 arrow functions (`=>`). Arrow functions [explicitly prevent binding `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this), so the above examples will not work because of the value of `this`.

## Mongoose [Virtuals](https://mongoosejs.com/docs/guide.html#virtuals)
[Virtuals](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual) are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
```
// define a schema
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

// compile our model
const Person = mongoose.model('Person', personSchema);

// create a document
const axl = new Person({
  name: { first: 'Axl', last: 'Rose' }
});
```

Suppose you want to print out the person's full name. You could do it yourself:

```
console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
```

But [concatenating](https://masteringjs.io/tutorials/fundamentals/string-concat) the first and last name every time can get cumbersome. And what if you want to do some extra processing on the name, like removing [diacritics](https://www.npmjs.com/package/diacritics)? A [virtual property getter](https://mongoosejs.com/docs/api/virtualtype.html#virtualtype_VirtualType-get) lets you define a `fullName` property that won't get persisted to MongoDB.
```
// That can be done either by adding it to schema options:
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
}, {
  virtuals: {
    fullName: {
      get() {
        return this.name.first + ' ' + this.name.last;
      }
    }
  }
});

// Or by using the virtual method as following:
personSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});
```

Now, mongoose will call your getter function every time you access the `fullName` property:
```
console.log(axl.fullName); // Axl Rose
```

You can also add a custom setter to your virtual that will let you set both first name and last name via the `fullName` virtual.
```
// Again that can be done either by adding it to schema options:
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
}, {
  virtuals: {
    fullName: {
      get() {
        return this.name.first + ' ' + this.name.last;
      },
      set(v) {
        this.name.first = v.substr(0, v.indexOf(' '));
        this.name.last = v.substr(v.indexOf(' ') + 1);
      }
    }
  }
});

// Or by using the virtual method as following:
personSchema.virtual('fullName').
  get(function() {
    return this.name.first + ' ' + this.name.last;
  }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

axl.fullName = 'William Rose'; // Now `axl.name.first` is "William"
```

Virtual property setters are applied before other validation. So the example above would still work even if the `first` and `last` name fields were required.

Only non-virtual properties work as part of queries and for field selection. Since virtuals are not stored in MongoDB, you can't query with them.

Learn more about virtuals [here](https://masteringjs.io/tutorials/mongoose/virtuals).

## Defining Mongoose [Middleware](https://mongoosejs.com/docs/middleware.html)
Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing [plugins](https://mongoosejs.com/docs/plugins.html).

Mongoose has 4 types of middleware: document middleware, model middleware, aggregate middleware, and query middleware.

Document middleware is supported for the following document functions. In Mongoose, a document is an instance of a `Model` class. In document middleware functions, `this` refers to the document. To access the model, use `this.constructor`.
- [validate](https://mongoosejs.com/docs/api/document.html#document_Document-validate)
- [save](https://mongoosejs.com/docs/api/model.html#model_Model-save)
- [remove](https://mongoosejs.com/docs/api/model.html#model_Model-remove)
- [updateOne](https://mongoosejs.com/docs/api/document.html#document_Document-updateOne)
- [deleteOne](https://mongoosejs.com/docs/api/model.html#model_Model-deleteOne)
- [init](https://mongoosejs.com/docs/api/document.html#document_Document-init) (note: init hooks are [synchronous](https://mongoosejs.com/docs/middleware.html#synchronous))

Query middleware is supported for the following Query functions. Query middleware executes when you call exec() or then() on a Query object, or await on a Query object. In query middleware functions, this refers to the query.
- [count](https://mongoosejs.com/docs/api/query.html#query_Query-count)
- [countDocuments](https://mongoosejs.com/docs/api/query.html#query_Query-countDocuments)
- [deleteMany](https://mongoosejs.com/docs/api/query.html#query_Query-deleteMany)
- [deleteOne](https://mongoosejs.com/docs/api/query.html#query_Query-deleteOne)
- [estimatedDocumentCount](https://mongoosejs.com/docs/api/query.html#query_Query-estimatedDocumentCount)
- [find](https://mongoosejs.com/docs/api/query.html#query_Query-find)
- [findOne](https://mongoosejs.com/docs/api/query.html#query_Query-findOne)
- [findOneAndDelete](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndDelete)
- [findOneAndRemove](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndRemove)
- [findOneAndReplace](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndReplace)
- [findOneAndUpdate](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndUpdate)
- [remove](https://mongoosejs.com/docs/api/model.html#model_Model-remove)
- [replaceOne](https://mongoosejs.com/docs/api/query.html#query_Query-replaceOne)
- [update](https://mongoosejs.com/docs/api/query.html#query_Query-update)
- [updateOne](https://mongoosejs.com/docs/api/query.html#query_Query-updateOne)
- [updateMany](https://mongoosejs.com/docs/api/query.html#query_Query-updateMany)
- [validate](https://mongoosejs.com/docs/validation.html#update-validators)

Aggregate middleware is for MyModel.aggregate(). Aggregate middleware executes when you call exec() on an aggregate object. In aggregate middleware, this refers to the aggregation object.
- [aggregate](https://mongoosejs.com/docs/api/model.html#model_Model-aggregate)

Model middleware is supported for the following model functions. Don't confuse model middleware and document middleware: model middleware hooks into static functions on a Model class, document middleware hooks into methods on a Model class. In model middleware functions, this refers to the model.
- [insertMany](https://mongoosejs.com/docs/api/model.html#model_Model-insertMany)

All middleware types support pre and post hooks. How pre and post hooks work is described in more detail below.

### [Pre](https://mongoosejs.com/docs/middleware.html#pre)
Pre middleware functions are executed one after another, when each middleware calls next.
```
const schema = new Schema({ /* ... */ });
schema.pre('save', function(next) {
  // do stuff
  next();
});
```

In [mongoose 5.x](http://thecodebarbarian.com/introducing-mongoose-5.html#promises-and-async-await-with-middleware), instead of calling `next()` manually, you can use a function that returns a promise. In particular, you can use `async/await`.

```
schema.pre('save', function() {
  return doStuff().
    then(() => doMoreStuff());
});

// Or, in Node.js >= 7.6.0:
schema.pre('save', async function() {
  await doStuff();
  await doMoreStuff();
});
```

See docs for [error handling](https://mongoosejs.com/docs/middleware.html#error-handling).

#### Use Cases
Middleware are useful for atomizing model logic. Here are some other ideas:
- complex validation
- removing dependent documents (removing a user removes all their blogposts)
- asynchronous defaults
- asynchronous tasks that a certain action triggers

### [Post](https://mongoosejs.com/docs/middleware.html#post)
[post](https://mongoosejs.com/docs/api.html#schema_Schema-post) middleware are executed *after* the hooked method and all of its `pre` middleware have completed.
```
schema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});
schema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});
schema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});
schema.post('deleteOne', function(doc) {
  console.log('%s has been deleted', doc._id);
});
```

See `Virtuals` directory for example using `pre` and `post` middleware on `save()` to a `people` database.