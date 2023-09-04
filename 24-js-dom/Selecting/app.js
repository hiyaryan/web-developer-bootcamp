// select element by id
const chicken = document.getElementById("chicken");
console.log(chicken);

const banner = document.getElementById("banner");
console.log(banner);
console.dir(banner);

const toc = document.getElementById("toc");
console.dir(toc);

// select element by tag
const allImgs = document.getElementsByTagName("img");
console.dir(allImgs)

for (let img of allImgs) {
    console.log(img.src);
    // img.src = "https://images.unsplash.com/photo-1563281577-a7be47e20db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
}

const anchorTags = document.getElementsByTagName("a");
console.log(anchorTags);

const boldTags = document.getElementsByTagName("b");
console.log(boldTags);

// select element by class name
const squareImgs = document.getElementsByClassName("square");
console.log(squareImgs);

for (let square of squareImgs) {
    console.log(square);
    // square.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg"
}

// selecting an element by query
// gets the first paragraph
const paragraph = document.querySelector("p");
console.log(paragraph)

const paragraphs = document.getElementsByTagName("p")
console.log(paragraphs);

const queryBanner = document.querySelector("#banner")
console.log(queryBanner);

const querySquare = document.querySelector(".square")
console.log(querySquare);

// selecting the second img using nth-of-type
const secondImg = document.querySelector("img:nth-of-type(2)")
console.log(secondImg);

// selecting an anchor tag with a specified attribute
const javaAnchor = document.querySelector("a[title='Java']");
console.log(javaAnchor);

// selecting elements by query
const queryParagraphs = document.querySelectorAll("p")
console.log(queryParagraphs);

const queryImgs = document.querySelectorAll("img")
console.log(queryImgs);

// selecting all anchor tags in the first paragraph
const anchorsFirstParagraph = document.querySelectorAll("p a")
console.log(anchorsFirstParagraph);

for (let link of anchorsFirstParagraph) {
    console.log(link.href);
}

// selecting all anchor tags in the second paragraph
const anchorsSecondParagraph = document.querySelectorAll("p:nth-of-type(2) a");
console.log(anchorsSecondParagraph);