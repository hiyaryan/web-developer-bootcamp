const h1 = document.querySelector("h1");
console.dir(h1);

// innerText
const firstParagraphInnerText = document.querySelector("p").innerText
console.log(firstParagraphInnerText);

// document.querySelector("p").innerText = "lololol"

const allLinks = document.querySelectorAll("a");

for (let link of allLinks) {
    link.innerText = "I AM A LINK!"
}

// this is registered as text not html
document.querySelector("h1").innerText = "<i>adsfsdaf</i>";

// textContent
const firstParagraphTextContent = document.querySelector("p").textContent;
console.log(firstParagraphTextContent);

// innerHTML
console.log(h1.innerHTML);

// registers the <i> tag as html
h1.innerHTML = "<i>adsfsdaf</i>";
h1.innerHTML += "<sup>asdfdaf</sup>";

// attributes
const banner = document.querySelector("#banner");
// banner.id = "whoops"
console.log(banner.id);

const firstAnchor = document.querySelector("a");
console.log(firstAnchor.href);
console.log(firstAnchor.getAttribute("href"));
console.log(firstAnchor.setAttribute("href", "https://www.google.com"));

console.log(firstAnchor.getAttribute("id"));
console.log(firstAnchor.getAttribute("class"));
console.log(firstAnchor.getAttribute("title"));

const textInput = document.querySelector("input[type='text']");
// textInput.type = 'password';
// textInput.type = 'color';
textInput.setAttribute("type", "text");
console.log(textInput);

// changing styles
const h1Style = h1.style
console.log(h1Style.color); // stylesheet color is not accessible

h1Style.color = "magenta"
console.log(h1Style.color); // color changed inline

for (let link of allLinks) {
    link.style.color = "rgb(0, 108, 134)";
    link.style.textDecorationColor = "magenta";
    link.style.textDecorationStyle = "wavy";
}

// classList
const h2 = document.querySelector("h2");
console.log(h2.getAttribute("class"));

// h2.setAttribute("class", "purple");
// h2.setAttribute("class", "border"); // overwrites purple

let currentClasses = h2.getAttribute("class")
// h2.setAttribute("class", `${currentClasses} purple`); // have to add all classes in a string

// using classList to add multiple classes
console.log(h2.classList);

h2.classList.add("purple");
h2.classList.add("border");

h2.classList.remove("border");

console.log(h2.classList.contains("border"));
console.log(h2.classList.contains("purple"));

// toggles a class (and therefore its styles) 
console.log(h2.classList.toggle("purple"));

// traversal
// parentElement
const firstBold = document.querySelector("b");
console.log(firstBold);

console.log(firstBold.parentElement); // p
console.log(firstBold.parentElement.parentElement); // body
console.log(firstBold.parentElement.parentElement.parentElement); // html
console.log(firstBold.parentElement.parentElement.parentElement.parentElement); // null

// children
const paragraph = firstBold.parentElement
console.log(paragraph.children);
console.log(paragraph.children[0]);
console.log(paragraph.children[0].parentElement);

const squareImg = document.querySelector(".square")
console.log(squareImg);
console.log(squareImg.parentElement);
console.log(squareImg.children);

// sibling
console.log(squareImg.previousSibling);
console.log(squareImg.nextSibling);
console.log(squareImg.previousElementSibling);
console.log(squareImg.nextElementSibling);

// appendChild
// adding a new element (node) as a child of a parent element
const newImg = document.createElement("img");
console.dir(newImg);

newImg.src = "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80";

document.body.appendChild(newImg);
newImg.classList.add("square");

const newH3 = document.createElement("h3");
newH3.innerText = "I am new!";

document.body.appendChild(newH3);

// append/prepend
// append to the end of an existing element
const p = document.querySelector("p");
p.append("I am new text yaaaay!!", "adsfdsagfdgasdf");

const newB = document.createElement("b");
newB.append("Hi!");

p.prepend(newB)

// insertAdjacentElement
const newH2 = document.createElement("h2");
newH2.append("Are adorable chickens");

h1.insertAdjacentElement("afterend", newH2);

// after
const h3 = document.createElement("h3");
h3.innerText = "add h3 using after()";
h1.after(h3)

// removeChild
const firstLi = document.querySelector("li");

const ul = document.querySelector("ul")
ul.removeChild(firstLi)

const b = document.querySelector("b")
b.parentElement.removeChild(b)

// remove
const img = document.querySelector("img")

// img.parentElement.removeChild(img)
img.remove() // same as above

