// getting-started.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipsDemo');
}

const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// seeding the tweets collection
const makeFirstTweets = async () => {
    const user1 = new User({ username: "chickenfan99", age: 61 });
    const tweet1 = new Tweet({ text: "omg I love my chicken family", likes: 0 });
    tweet1.user = user1;
    user1.save();
    tweet1.save();
}

// makeFirstTweets();

const makeTweet = async () => {
    const user1 = await User.findOne({ username: "chickenfan99" });
    const tweet2 = new Tweet({ text: "bock bock bock my chickens make noises", likes: 1239 });
    tweet2.user = user1;
    tweet2.save();
}

// makeTweet();

// finding first tweet
const findTweet = async () => {
    // populate tweet with user but only give username
    const tweet = await Tweet.findOne({}).populate("user", "username");
    console.log(tweet);
}

findTweet();

const findAllTweets = async () => {
    // populate tweet with user but only give username
    const tweets = await Tweet.find({}).populate("user", "username");
    console.log(tweets);
}

findAllTweets();