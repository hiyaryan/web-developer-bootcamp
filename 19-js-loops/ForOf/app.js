const subreddits = ['cringe', 'books', 'chickens', 'funny', 'pics', 'soccer', 'gunners'];

// printing an array with a for loop
for (let i = 0; i < subreddits.length; i++) {
    console.log(`Visit reddit.com/r/${subreddits[i]}`);
}

// printing an array with a for...of loops
for (subreddit of subreddits) {
    console.log(`Visit reddit.com/r/${subreddit}`);
}

// improving readability with for...of loops
const seatingChart = [
    ['Kristen', 'Erik', 'Namita'],
    ['Geoffrey', 'Juanita', 'Antonio', 'Kevin'],
    ['Yuma', 'Sakura', 'Jack', 'Erika'],
]

// before
for (let i = 0; i < seatingChart.length; i++) {
    let row = seatingChart[i]
    for (let j = 0; j < row.length; j++) {
        console.log(row[j]);
    }
}

// after
for (row of seatingChart) {
    for (student of row) {
        console.log(student);
    }
}

// iterating over a String (another iterable type)
for (let char of "hello world") {
    console.log(char);
}