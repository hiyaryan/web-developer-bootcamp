# Section 24: Introducing the World of the DOM

- [Introducing the DOM](#introducing-the-dom)
- [The Document Object](#the-document-object)
- [Selecting](#selecting)
  - [`getElementById`](#getelementbyid)
  - [`getElementsByTagName`](#getelementsbytagname)
  - [`getElementsByClassName`](#getelementsbyclassname)
  - [`querySelector`](#queryselector)
  - [`querySelectorAll`](#queryselectorall)
- [Manipulating](#manipulating)
  - [`innerHTML`](#innerhtml)
  - [`textContent`](#textcontent)
  - [`innerText`](#innertext)
  - [Attributes](#attributes)
  - [Changing Styles](#changing-styles)
  - [classList](#classlist)
  - [Traversing Parent/Child/Sibling](#traversing-parentchildsibling)
  - [Append](#append)
    - [`appendChild`](#appendchild)
    - [`append`](#append-1)
    - [`insertAdjacentElement`](#insertadjacentelement)
    - [`before`](#before)
    - [`after`](#after)
  - [Remove](#remove)
    - [`removeChild`](#removechild)
    - [`remove`](#remove-1)
- [Pokemon Sprites Demo](#pokemon-sprites-demo)

## Introducing the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
The (Document Object Model) DOM is a JavaScript representation of a webpage.
- It is the window into the contents of a webpage.
- It is a bunch of objects that you can interact with via JS.

## The [Document Object](https://developer.mozilla.org/en-US/docs/Web/API/Document)
Part of the loading process of a web page involves loading in the HTML+CSS into the DOM which makes it available as JavaScript Objects.

To view the `document` properties type `console.dir(document)`

Each tag in the HTML gets its own JavaScript object which has a tree structure.
```
<body>
    <h1>Hello!</h1>
    <ul>
        <li>Water Plants</li>
        <li>Get Some Sleep</li>
    </ul>
</body>
```

Alongside `window`, `document` is a special object that can used to access the html elements.

The `document` is the entry point into the world of the DOM. It contains representations of all the content on a page, plus tons of useful methods and properties. It is the root of the DOM.

## Selecting
JavaScript can be used to select elements from the `document` that can then be manipulated.

### [`getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
The `getElementById()` method of the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface returns an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) object representing the element whose [`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id) property matches the specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

Syntax
```
getElementById(id)
```

Selecting an element by id.
```
<html lang="en">
  <head>
    <title>getElementById example</title>
  </head>
  <body>
    <p id="para">Some text here</p>
    <button onclick="changeColor('blue');">blue</button>
    <button onclick="changeColor('red');">red</button>
  </body>
</html>

```

```
function changeColor(newColor) {
  const elem = document.getElementById("para");
  elem.style.color = newColor;
}

```

### [`getElementsByTagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName) 
 The getElementsByTagName method of [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface returns an [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) of elements with the given tag name.

The complete document is searched, including the root node. The returned `HTMLCollection` is live, meaning that it updates itself automatically to stay in sync with the DOM tree without having to call document.`getElementsByTagName()` again. 

Syntax
```
getElementsByTagName(name)
```

Selecting elements by tag.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>getElementsByTagName example</title>
    <script>
      function getAllParaElems() {
        const allParas = document.getElementsByTagName("p");
        const num = allParas.length;
        alert(`There are ${num} paragraph in this document`);
      }

      function div1ParaElems() {
        const div1 = document.getElementById("div1");
        const div1Paras = div1.getElementsByTagName("p");
        const num = div1Paras.length;
        alert(`There are ${num} paragraph in #div1`);
      }

      function div2ParaElems() {
        const div2 = document.getElementById("div2");
        const div2Paras = div2.getElementsByTagName("p");
        const num = div2Paras.length;
        alert(`There are ${num} paragraph in #div2`);
      }
    </script>
  </head>
  <body style="border: solid green 3px">
    <p>Some outer text</p>
    <p>Some outer text</p>

    <div id="div1" style="border: solid blue 3px">
      <p>Some div1 text</p>
      <p>Some div1 text</p>
      <p>Some div1 text</p>

      <div id="div2" style="border: solid red 3px">
        <p>Some div2 text</p>
        <p>Some div2 text</p>
      </div>
    </div>

    <p>Some outer text</p>
    <p>Some outer text</p>

    <button onclick="getAllParaElems();">
      Show all p elements in document
    </button>
    <br />

    <button onclick="div1ParaElems();">
      Show all p elements in div1 element
    </button>
    <br />

    <button onclick="div2ParaElems();">
      Show all p elements in div2 element
    </button>
  </body>
</html>
```

#### [`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
The `HTMLCollection` interface represents a generic collection (array-like object similar to [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)) of elements (in document order) and offers methods and properties for selecting from the list.

### [`getElementsByClassName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
 The `getElementsByClassName` method of [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface returns an array-like object of all child elements which have all of the given class name(s).

When called on the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) object, the complete document is searched, including the root node. You may also call `getElementsByClassName()` on any element; it will return only elements which are descendants of the specified root element with the given class name(s). 

Syntax
```
getElementsByClassName(names)
```

Selecting an element by class.
```
<html lang="en">
  <body>
    <div id="parent-id">
      <p>hello world 1</p>
      <p class="test">hello world 2</p>
      <p>hello world 3</p>
      <p>hello world 4</p>
    </div>

    <script>
      const parentDOM = document.getElementById("parent-id");

      const test = parentDOM.getElementsByClassName("test"); // a list of matching elements, *not* the element itself
      console.log(test); // HTMLCollection[1]

      const testTarget = parentDOM.getElementsByClassName("test")[0]; // the first element, as we wanted
      console.log(testTarget); // <p class="test">hello world 2</p>
    </script>
  </body>
</html>
```

### [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
The [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) method `querySelector()` returns the first [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) within the document that matches the specified selector, or group of selectors. If no matches are found, `null` is returned. 

Use [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) to make more specific queries.

```
// finds first h1 element
document.querySelector("h1")

// finds first element with ID of red
document.querySelector("#red")

// finds first element with class of
document.querySelector(".big")

// find the first anchor tag in the second paragraph
document.querySelector("p:nth-of-type(2) a")

// find the anchor tag with a specific attribute
document.querySelector("a[title='Java']")
```

Syntax
```
querySelector(selectors)
```

Making a query to select an element.
```
<div id="foo\bar"></div>
<div id="foo:bar"></div>

<script>
  console.log("#foo\bar"); // "#fooar" (\b is the backspace control character)
  document.querySelector("#foo\bar"); // Does not match anything

  console.log("#foo\\bar"); // "#foo\bar"
  console.log("#foo\\\\bar"); // "#foo\\bar"
  document.querySelector("#foo\\\\bar"); // Match the first div

  document.querySelector("#foo:bar"); // Does not match anything
  document.querySelector("#foo\\:bar"); // Match the second div
</script>
```

### [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
The [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) method `querySelectorAll()` returns a static (not live) [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) representing a list of the document's elements that match the specified group of selectors. 

Syntax
```
querySelectorAll(selectors)
```

Making a query to select a set of elements.
```
const highlightedItems = userList.querySelectorAll(".highlighted");

highlightedItems.forEach((userItem) => {
  deleteUser(userItem);
});
```

## Manipulating
Using JavaScript to impact the HTML and CSS that a user sees or doesn't see.

Properties and methods to know:
- `classList`
- `getAttribute()`
- `setAttribute()`
- `appendChild()`
- `append()`
- `prepend()`
- `removeChild()`
- `remove()`
- `createElement`
- `innerText`
- `textContent`
- `innerHTML`
- `value`
- `parentElement`
- `children`
- `nextSibling`
- `previousSibling`
- `style`

### [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
 The Element property `innerHTML` gets or sets the HTML or XML markup contained within the element.

To insert the HTML into the document rather than replace the contents of an element, use the method `insertAdjacentHTML()`. 

```
let contents = myElement.innerHTML;
```

### [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
The `textContent` property of the Node interface represents the text content of the node and its descendants. 

```
let text = document.getElementById("divA").textContent;
```

### [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
The `innerText` property of the HTMLElement interface represents the rendered text content of a node and its descendants.

As a getter, it approximates the text the user would get if they highlighted the contents of the element with the cursor and then copied it to the clipboard. As a setter this will replace the element's children with the given value, converting any line breaks into `<br>` elements. 

```
const source = document.getElementById("source");
const innerTextOutput = document.getElementById("innerTextOutput");

innerTextOutput.value = source.innerText;
```

### [Attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes)
The `Element.attributes` property returns a live collection of all attribute nodes registered to the specified node. It is a [NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap), not an `Array`, so it has no [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) methods and the [Attr](https://developer.mozilla.org/en-US/docs/Web/API/Attr) nodes' indexes may differ among browsers. To be more specific, `attributes` is a key/value pair of strings that represents any information regarding that attribute. 

```
// Get the first <p> element in the document
const paragraph = document.querySelector("p");
const attributes = paragraph.attributes;
```

Direct attributes can be accessed on JavaScript objects using the dot syntax.
```
const input = document.querySelector("input[type='text']");
input.type // "text"
```

Direct attributes can be accessed on JavaScript objects using the [`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) or [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) methods.
```
const input = document.querySelector("input[type='text']");
input.setAttribute("type", "password")
input.getAttribute("type") // "password"
```

### [Changing Styles](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
The read-only `style` property of the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) returns the inline style of an element in the form of a live [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) object that contains a list of all styles properties for that element with values assigned only for the attributes that are defined in the element's inline [style](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) attribute.

```
const element = document.getElementById("elt");
const out = document.getElementById("out");
const elementStyle = element.style;

// We loop through all styles (for…of doesn't work with CSStyleDeclaration)
for (const prop in elementStyle) {
  if (Object.hasOwn(elementStyle, prop)) {
    out.textContent += `${
      elementStyle[prop]
    } = '${elementStyle.getPropertyValue(elementStyle[prop])}'\n`;
  }
}
```

Style names in JavaScript are camel-cased (e.g. `textAlign`) where in CSS a dash is used to separate words (e.g. `text-align`).

Styles from a style sheet are not accessible using the `style` property. Only styles applied inline. To get these computed styles, the styles must be fully loaded in the browser, then they can be accessed using the `window` method [`getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

```
const h1 = document.querySelector('h1')
h1.style.fontSize // ''

window.getComputedStyle(h1).fontSize // 32px
```

### [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
 The `Element.classList` is a read-only property that returns a live [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) collection of the `class` attributes of the element. This can then be used to manipulate the class list.

Using `classList` is a convenient alternative to accessing an element's list of classes as a space-delimited string via [element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className). 

```
const div = document.createElement("div");
div.className = "foo";

// our starting state: <div class="foo"></div>
console.log(div.outerHTML);

// use the classList API to remove and add classes
div.classList.remove("foo");
div.classList.add("anotherclass");

// <div class="anotherclass"></div>
console.log(div.outerHTML);

// if visible is set remove it, otherwise add it
div.classList.toggle("visible");

// add/remove visible, depending on test conditional, i less than 10
div.classList.toggle("visible", i < 10);

// false
console.log(div.classList.contains("foo"));

// add or remove multiple classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz");

// add or remove multiple classes using spread syntax
const cls = ["foo", "bar"];
div.classList.add(...cls);
div.classList.remove(...cls);

// replace class "foo" with class "bar"
div.classList.replace("foo", "bar");
```

### Traversing Parent/Child/Sibling
Traversing is the ability to move from one element to another.

#### [`parentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
The read-only `parentElement` property of [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface returns the DOM node's parent [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), or `null` if the node either has no parent, or its parent isn't a DOM [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). 

#### [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
 The read-only `children` property returns a live [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) which contains all of the child [elements](https://developer.mozilla.org/en-US/docs/Web/API/Element) of the element upon which it was called.

`Element.children` includes only element nodes. To get all child nodes, including non-element nodes like text and comment nodes, use [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes).

#### [`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling) and [`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)
The `Element.previousElementSibling` read-only property returns the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) immediately prior to the specified one in its parent's children list, or null if the specified element is the first one in the list. 

The `Element.nextElementSibling` read-only property returns the element immediately following the specified one in its parent's children list, or `null` if the specified element is the last one in the list. 

### Append
#### [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
The `appendChild()` method of the [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface adds a node to the end of the list of children of a specified parent node.

#### [`append`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
The `Element.append()` method inserts a set of [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects or string objects after the last child of the Element. String objects are inserted as equivalent [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes.

#### [`prepend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend)
The `Element.prepend()` method inserts a set of [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects or string objects before the first child of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). String objects are inserted as equivalent [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes. 

#### [`insertAdjacentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
The `insertAdjacentElement()` method of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) interface inserts a given element node at a given position relative to the element it is invoked upon. 

Syntax
```
insertAdjacentElement(position, element)
```

`position`

A string representing the position relative to the `targetElement`; must match (case-insensitively) one of the following strings:
- `'beforebegin'`: Before the `targetElement` itself.
- `'afterbegin'`: Just inside the `targetElement`, before its first child.
- `'beforeend'`: Just inside the `targetElement`, after its last child.
- `'afterend'`: After the `targetElement` itself.

#### [`before`](https://developer.mozilla.org/en-US/docs/Web/API/Element/before)
The `Element.before()` method inserts a set of [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) or string objects in the children list of this `Element`'s parent, just before this `Element`. String objects are inserted as equivalent [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes. 

#### [`after`](https://developer.mozilla.org/en-US/docs/Web/API/Element/after)
The `Element.after()` method inserts a set of [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) or string objects in the children list of the `Element`'s parent, just after the `Element`. String objects are inserted as equivalent [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes. 

### Remove
#### [`removeChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)
The `removeChild()` method of the [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface removes a child node from the DOM and returns the removed node. 

#### [`remove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)
The `Element.remove()` method removes the element from the DOM.

## Pokemon Sprites Demo
See Pokemon folder for demo.