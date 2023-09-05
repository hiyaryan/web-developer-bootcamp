// this only works for elements that are already on the page on load
// // new elements added after the fact do not include the click event
// const lis = document.querySelectorAll("li");
// for (let li of lis) {
//     li.addEventListener("click", function () {
//         li.remove();
//     });
// }

const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');
tweetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value)
    usernameInput.value = '';
    tweetInput.value = '';
});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username)
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`)
    tweetsContainer.append(newTweet);
}

tweetsContainer.addEventListener('click', function (e) {
    console.log(e);

    // ensure that only LI are removed 

    // if the element name (nodeName) is LI then execute the next statement to remove it 
    e.target.nodeName === 'LI' && e.target.remove();
})