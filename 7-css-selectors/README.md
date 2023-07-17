# Section 7: The World of CSS Selectors

## CSS Pattern Recap
```
selector {
    property: value;
}
```

ex. Make all `<h1>` elements purple.
```
h1 {
    color: purple;
}
```

ex. Select every other text input and give it a red border.
```
input[type="text"]:nth-of-type(2n) {
    border: 2px solid red;
}
```

## CSS Selectors
### Universal Selector - selects everything
```
* {
    color: black;
}
```

### Element Selector - select everything of a given type
```
img {
    width: 100px;
    height: 200px;
}
```

### Selector List - select all elements in the list
```
h1, h2 {
    color: magenta;
}
```

### ID Selector - select elements by ID
ex. Select element with id of 'logout'.
```
#logout {
    color: orange;
    height: 200px;
}
```

Every element should have a unique ID, but IDs should be used sparingly (see [Class Selector](#class-selector---select-elements-by-class)).

### Class Selector - select elements by class
ex. Select elements with class of 'complete'.
```
.complete {
    color: green;
}
```

A class groups multiple elements together and is used to apply the same style over them all.

### Descendant Selector
ex. Select all `<a>`'s that are nested inside an `<li>`
```
li a {
    color: teal;
}
```

### Adjacent Selector (Combinator)
ex. Select only the paragraphs that are immediately preceded by an `<h1>`
```
h1 + p {
    color: red;
}
```

### Direct Child (Descendent) Selector
ex. Select only the `<li>`'s that are direct children of a `<div>` element.
```
div > li {
    color: white;
}
```

### [Attribute Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
ex. Select all input elements where the type attribute is set to "text".
```
input[type="text"] {
    width: 300px;
    color: yellow;
}
```

### [Pseudo Classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
Keywords added to selectors that specifies a special state of the selected elements.
- `:active`
- `:checked`
- `:first`
- `:first-child`
- `:hover`
- `:not()`
- `:nth-child()`
- `:nth-of-type()`

ex. Select any `<a>` element when "[hovered](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)".
```
a:hover {
    color: orange;
}
```

ex. Select any `<a>` that is being "[activated](https://developer.mozilla.org/en-US/docs/Web/CSS/:active)".
```
a:activate {
    color: red
}
```

ex. Select any [checked](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked)/selected radio, checkbox, or option.
```
:checked {
    margin-left: 25px;
    border: 1px solid blue
}
```

ex. Select every fourth ([nth-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)) `<p>` element among any group of siblings.
```
p:nth-of-type(4n) {
    color: lime;
}
```

### [Pseudo Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
Keywords added to selectors that allows a particular part of the selected elements to be styled.
- `::after`
- `::before`
- `::first-letter`
- `::first-line`
- `::selection`

ex. Select the [first-letter](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) of a `<p>`
```
p::first-letter {
    font-size: 130%;
}
```

ex. Select the [first-line](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line) of a `<p>`
```
p::first-line {
    color: red;
}
```

ex. Select the [selection](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection) of the document that has been highlighted by the user.
```
::selection {
    background-color: cyan;
}
```

## The Cascade
The order that styles are declared matters.

ex. Purple wins.
```
h1 {
    color: red;
}

h1 {
    color: purple;
}
```

## Specificity
- How the browser decides which rules to apply when multiple rules could apply to the same element.
- Measures how specific a given selector is; more specific selector's styles are applied.

ex. `section p` is more specific so its styles are applied.
```
/* Element Selector */
p {
    color: yellow;
}

/* Element Selector + Element Selector */
section p {
    color: teal;
}
```

### Rule
In general ID is more specific than Class which is more specific than Element.
- ID (100x) > Class (10x) > Element (1x)

### Specificity Score
The [rule](#rule) gives factors that sum a total specificity score.

Therefore, the specificity score for `section p` in the example is,
- ID Selectors: 0 * 100
- Class, Attributes, & Pseudo-Class Selectors: 0 * 10
- Element and Pseudo-Element Selectors: 2 * 1
- Total: (0 * 100) + (0 * 10) + (2 * 1) = 2

ex. Specificity score for `#submit` ID selector.
```
#submit {
    color: olive;
}
```
- ID Selectors: 1 * 100
- Class, Attributes, & Pseudo-Class Selectors: 0 * 10
- Element and Pseudo-Element Selectors: 0 * 1
- Total: (1 * 100) + (0 * 10) + (0 * 1) = 100

ex. Specificity score for `nav a.active`
```
nav a.active {
    color: orange;
}
```
- ID Selectors: 0 * 100
- Class, Attributes, & Pseudo-Class Selectors: 1 * 10
- Element and Pseudo-Element Selectors: 2 * 1
- Total: (0 * 100) + (1 * 10) + (2 * 1) = 12

Note: Specificity score caveat.
-  Having 10 elements does not equate to 1 class, so it does not make sense to sum the score if there are more than 10 selectors in any of the categories (see [calculator](#additional-resources))


#### Inline Styles
Inline styles are more specific than IDs.
- Inline > ID > Class > Element

Note: Recall that inline styles are generally not recommended.

#### [`!important` exception](https://developer.mozilla.org/en-US/docs/Web/CSS/important)
`!important` overrides specificity.

ex. `!important` overriding inline specificity.
```
<!-- HTML -->
<div class="foo" style="color: red;">What color am I?</div>

/* CSS */
.foo[style*="color: red"] {
    color: firebrick !important;
}
```

Note: `!important` is generally not recommended.

## Inheritance
All children elements will inherit styles of the parent element unless otherwise specified.

`<body>` is a parent element of `<h1>`
- if `color` is set for `<body>`, `<h1>` will inherit the color
- if `color` is set for `<h1>`, `<h1>` will be assigned that color over the inherited color

### 'Inherited from `body`'
In Chrome dev tools (Elements > Styles), if an element inherits a style, it will be indicated by 'Inherited from ...'.

### [`inherit`](https://developer.mozilla.org/en-US/docs/Web/CSS/inherit)
Not every element inherits from its parent automatically like buttons and input elements.
- `inherit` keyword forces these child elements to adopt the styles of their parent element. 

Note: On MDN, there is a [Formal definition](https://developer.mozilla.org/en-US/docs/Web/CSS/border#formal_definition) section that indicates if styles for the element are inherited (link shows border element with 'no' on Inherited).
- Example of 'yes' on Inherited: [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color#formal_definition)

## Additional Resources
- Trending Color Palettes: [coolors](https://coolors.co/palettes/trending)
- Specificity: [calculator](https://specificity.keegan.st/)

### Chrome Dev Tools
- Elements > Styles
  - Shows which styles are winning specificity.
  - Provides style experimentation.
  - Allows for forced element states to be applied e.g. can apply a hover, `:hov`, state to an element.