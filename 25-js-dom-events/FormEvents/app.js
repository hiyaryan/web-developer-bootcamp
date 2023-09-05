// old version
// const tweetForm = document.querySelector('#tweetForm');
// const tweetsContainer = document.querySelector('#tweets');
// tweetForm.addEventListener('submit', function (e) {
//     e.preventDefault(); // prevents the default action of re-routing to another page

//     // const usernameInput = document.querySelectorAll('input')[0];
//     // const tweetInput = document.querySelectorAll('input')[1];
//     const usernameInput = tweetForm.elements.username;
//     const tweetInput = tweetForm.elements.tweet;
//     addTweet(usernameInput.value, tweetInput.value)
//     usernameInput.value = '';
//     tweetInput.value = '';
// });

// const addTweet = (username, tweet) => {
//     const newTweet = document.createElement('li');
//     const bTag = document.createElement('b');
//     bTag.append(username)
//     newTweet.append(bTag);
//     newTweet.append(`- ${tweet}`)
//     tweetsContainer.append(newTweet);
// }

// new version
const form = document.querySelector("#shelterForm");
const input = document.querySelector("#catName");
const list = document.querySelector("#list");

// overwrite the default submit functionality
form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default routing of submit event type

    console.log(input.value);
    const catName = input.value;

    const newLI = document.createElement("li");
    newLI.innerText = catName

    console.log(newLI);
    list.append(newLI);

    input.value = "";
})