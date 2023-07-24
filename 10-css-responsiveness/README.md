# Section 10: Responsive CSS & Flexbox

[Responsive web design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) (RWD) is a web design approach to make web pages render well on all screen sizes and resolutions while ensuring good usability. It is the way to design for a multi-device web.

- [Flexbox](#flexbox)
  - [`flex-direction`](#flex-direction)
  - [`justify-content`](#justify-content)
  - [`flex-wrap`](#flex-wrap)
  - [`align-items`](#align-items)
  - [`align-content`](#align-content)
  - [`align-self`](#align-self)
  - [`flex-basis`](#flex-basis)
  - [`flex-grow`](#flex-grow)
  - [`flex-shrink`](#flex-shrink)
  - [`flex` Shorthand](#flex-shorthand)
- [Media Queries](#media-queries)
  - [Viewport](#viewport)
  - [@media `width`](#media-width)
  - [@media `height`](#media-height)
  - [Logical Operators](#logical-operators)

## [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
Flexbox is a one-dimensional layout method for laying out items in rows or columns. It allows space to be distributed dynamically across elements of an unknown size (hence the term "flex").

```
/* activate flex in the parent container with the display property for its descendants */
#container {
    display: flex;
}
```

The [flex model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) is a horizontal 'main' axis and a vertical 'cross' axis of flex items controlled by the flex properties below.

### [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
The `flex-direction` CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). Default value is `row`.

```
/* The direction text is laid out in a line */
flex-direction: row;

/* Like <row>, but reversed */
flex-direction: row-reverse;

/* The direction in which lines of text are stacked */
flex-direction: column;

/* Like <column>, but reversed */
flex-direction: column-reverse;
```

### [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
The CSS `justify-content` property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. Default value is `flex-start`.

```
/* Positional alignment */
justify-content: center; /* Pack items around the center */
justify-content: start; /* Pack items from the start */
justify-content: end; /* Pack items from the end */
justify-content: flex-start; /* Pack flex items from the start */
justify-content: flex-end; /* Pack flex items from the end */
justify-content: left; /* Pack items from the left */
justify-content: right; /* Pack items from the right */

/* Baseline alignment */
/* justify-content does not take baseline values */

/* Normal alignment */
justify-content: normal;

/* Distributed alignment */
/* Distribute items evenly. The first item is flush with the start, the last is flush with the end */
justify-content: space-between;
/* Distribute items evenly. Start and end gaps are half the size of the space between each item */
justify-content: space-around;
/* Distribute items evenly. Start, in-between, and end gaps have equal sizes */
justify-content: space-evenly;
/* Distribute items evenly. Stretch 'auto'-sized items to fit the container */
justify-content: stretch;

/* Overflow alignment */
justify-content: safe center;
justify-content: unsafe center;
```

### [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
The `flex-wrap` CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.

```
flex-wrap: nowrap; /* Default value */
flex-wrap: wrap;
flex-wrap: wrap-reverse;
```

### [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
The CSS `align-items` property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.

```
/* Basic keywords */
align-items: normal;
align-items: stretch;

/* Positional alignment */
/* align-items does not take left and right values */
align-items: center; /* Pack items around the center */
align-items: start; /* Pack items from the start */
align-items: end; /* Pack items from the end */
align-items: flex-start; /* Pack flex items from the start */
align-items: flex-end; /* Pack flex items from the end */
align-items: self-start; /* Pack flex items from the start */
align-items: self-end; /* Pack flex items from the end */

/* Baseline alignment */
align-items: baseline;
align-items: first baseline;
align-items: last baseline; /* Overflow alignment (for positional alignment only) */
align-items: safe center;
align-items: unsafe center;
```

`baseline` aligns the letters within an element. This is useful when the element sizes vary.

### [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) 
The CSS `align-content` property sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.

```
/* Basic positional alignment */
/* align-content does not take left and right values */
align-content: center; /* Pack items around the center */
align-content: start; /* Pack items from the start */
align-content: end; /* Pack items from the end */
align-content: flex-start; /* Pack flex items from the start */
align-content: flex-end; /* Pack flex items from the end */

/* Normal alignment */
align-content: normal;

/* Baseline alignment */
align-content: baseline;
align-content: first baseline;
align-content: last baseline;

/* Distributed alignment */
/* Distribute items evenly. The first item is flush with the start, the last is flush with the end */
align-content: space-between;
/* Distribute items evenly. Items have a half-size space on either end */
align-content: space-around;
/* Distribute items evenly. Items have equal space around them */
align-content: space-evenly;
/* Distribute items evenly. Stretch 'auto'-sized items to fit the container */
align-content: stretch;

/* Overflow alignment */
align-content: safe center;
align-content: unsafe center;
```

### [align-self](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)
The `align-self` CSS property overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area. In Flexbox, it aligns the item on the cross axis.

```
/* Keyword values */
align-self: auto;
align-self: normal;

/* Positional alignment */
/* align-self does not take left and right values */
align-self: center; /* Put the item around the center */
align-self: start; /* Put the item at the start */
align-self: end; /* Put the item at the end */
align-self: self-start; /* Align the item flush at the start */
align-self: self-end; /* Align the item flush at the end */
align-self: flex-start; /* Put the flex item at the start */
align-self: flex-end; /* Put the flex item at the end */

/* Baseline alignment */
align-self: baseline;
align-self: first baseline;
align-self: last baseline;
align-self: stretch; /* Stretch 'auto'-sized items to fit the container */

/* Overflow alignment */
align-self: safe center;
align-self: unsafe center;
```

### [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)
The flex-basis CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with box-sizing.

```
/* Specify <'width'> */
flex-basis: 10em;
flex-basis: 3px;
flex-basis: 50%;
flex-basis: auto;

/* Intrinsic sizing keywords */
flex-basis: max-content;
flex-basis: min-content;
flex-basis: fit-content;

/* Automatically size based on the flex item's content */
flex-basis: content;
```

### [flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
The `flex-grow` CSS property sets the flex grow factor, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size.

When the `flex-container`'s main size is larger than the combined main size's of the flex items, the extra space is distributed among the flex items, with each item growth being their growth factor value as a proportion of the sum total of all the container's items' flex grow factors.

```
/* <number> values */
flex-grow: 3;
flex-grow: 0.6;
```

### [flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)
The `flex-shrink` CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.

In use, `flex-shrink` is used alongside the other flex properties `flex-grow` and `flex-basis`, and normally defined using the flex shorthand.

```
/* <number> values */
flex-shrink: 2;
flex-shrink: 0.6;
```

### [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) Shorthand
The `flex` CSS shorthand property sets how a flex item will grow or shrink to fit the space available in its flex container.

```
/* Keyword values */
flex: auto;
flex: initial;
flex: none;

/* One value, unitless number: flex-grow
flex-basis is then equal to 0. */
flex: 2;

/* One value, width/height: flex-basis */
flex: 10em;
flex: 30%;
flex: min-content;

/* Two values: flex-grow | flex-basis */
flex: 1 30px;

/* Two values: flex-grow | flex-shrink */
flex: 2 2;

/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

## Media Queries
Responsive Design
- Answers how you can create websites that look good on all screen sizes.
- It was common to create multiple stylesheets (or completely different websites) for different devices.
- In modern web development, only **one** website and stylesheet is created and responds to different device sizes and features.

[Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) allow you to apply CSS styles depending on a device's general type (such as print vs. screen) or other characteristics such as screen resolution or browser viewport width. Media queries are used for the following:

- To conditionally apply styles with the CSS `@media` and `@import` at-rules.
- To target specific media for the `<style>`, `<link>`, `<source>`, and other HTML elements with the `media=` attribute.
- To test and monitor media states using the `Window.matchMedia()` and `EventTarget.addEventListener()` methods.

Example
```
@media (max-width: 800px) {
    .sidebar {
        display: none;
    }

    .main {
        width: 80%;
    }
}

@media (min-width: 30em) and (orientation: landscape) {
    #container {
        flex-direction: column;
        justify-content: center;
    }
}
```

View how websites respond to various devices in Chrome using the 'Toggle Device Toolbar' `cmd+shift+M` in the dev tools.

Standard [media queries breakpoints](https://devfacts.com/media-queries-breakpoints-2023/) for `min-width` and `max-width` properties in 2023.

### [Viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport)
A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view.

The portion of the viewport that is currently visible is called the visual viewport. This can be smaller than the layout viewport, such as when the user has pinched-zoomed. The layout viewport remains the same, but the visual viewport became smaller.

### @media [width](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width)
The width CSS media feature can be used to test the width of the viewport (or the page box, for paged media).

#### Syntax
The width feature is specified as a <length> value representing the viewport width. It is a range feature, meaning that you can also use the prefixed min-width and max-width variants to query minimum and maximum values, respectively.

```
/* Exact width */
@media (width: 360px) {
  div {
    color: red;
  }
}

/* Minimum width */
@media (min-width: 35rem) {
  div {
    background: yellow;
  }
}

/* Maximum width */
@media (max-width: 50rem) {
  div {
    border: 2px solid blue;
  }
}
```

### @media [height](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height)
The height CSS media feature can be used to apply styles based on the height of the viewport (or the page box, for paged media).

#### Syntax
The height feature is specified as a <length> value representing the viewport height. It is a range feature, meaning that you can also use the prefixed min-height and max-height variants to query minimum and maximum values, respectively.

```
/* Exact height */
@media (height: 360px) {
  div {
    color: red;
  }
}

/* Minimum height */
@media (min-height: 25rem) {
  div {
    background: yellow;
  }
}

/* Maximum height */
@media (max-height: 40rem) {
  div {
    border: 2px solid blue;
  }
}
```

### @media [orientation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation)
The orientation CSS media feature can be used to test the orientation of the viewport (or the page box, for paged media).

The orientation feature is specified as a keyword value between `landscape` and `portrait`.

```
body {
  display: flex;
}

div {
  background: yellow;
  width: 200px;
  height: 200px;
  margin: 0.5rem;
  padding: 0.5rem;
}

@media (orientation: landscape) {
  body {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  body {
    flex-direction: column;
  }
}
```

### [Logical Operators](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#logical_operators)
The logical operators `not`, `and`, `only`, and `or` can be used to compose a complex media query. You can also combine multiple media queries into a single rule by separating them with commas.

```
@media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {
  body {
    line-height: 1.4;
  }
}
```

Introduced in Media Queries Level 4 is a new range syntax that allows for less verbose media queries when testing for any feature accepting a range.

```
@media (height > 600px) {
  body {
    line-height: 1.4;
  }
}

@media (400px <= width <= 700px) {
  body {
    line-height: 1.4;
  }
}
```