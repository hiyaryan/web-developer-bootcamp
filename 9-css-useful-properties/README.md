# Section 9: Other Assorted Useful CSS Properties
A mix of useful CSS properties.
- [Opacity + Alpha Channel](#opacity-and-the-alpha-channel)
- [Position](#the-position-property)
  - [Static](#static)
  - [Relative](#relative)
  - [Absolute](#absolute)
  - [Fixed](#fixed)
  - [Sticky](#sticky)
- [Transitions](#transitions)
  - [Transition Timing Functions](#transition-timing-functions)
- [Transforms](#transforms)
  - [Rotate](#rotate)
  - [Syntax](#syntax)
  - [Useful Transformations](#useful-transformations)
- [Background Property](#background-property)
  - [Image](#background-image)
  - [Size](#background-size)
  - [Repeat](#background-repeat)
  - [Position](#background-position)
  - [Free Images: Unsplash](#free-images)
- [Google Fonts](#google-fonts)
- [Extra](#extra)
  - [box-shadow](#box-shadow)
  - [cursor](#cursor)
  - [Whitespace](#whitespace)

## Opacity and The Alpha Channel
Both opacity and alpha channel deal with transparency.

### [Alpha Channel](https://developer.mozilla.org/en-US/docs/Glossary/Alpha)
```
/* red, green, blue, alpha */
background-color: rgba(0, 209, 112, 0.5);
```

The `a` in `rgba` deals with the transparency of the color, how see through it is, over a range of 0 to 1.
- 0 is completely transparent (fully see through)
- 1 is completely opaque (not see through at all)

Alpha channel can be represented in hexadecimal by adding 2 additional hex digits to the end of an rgb hex code.
- 00 is fully transparent
- FF is fully opaque
```
/* r: 00, g: cc, b: a0, a: b9 */
background-color: #00cca0b9;
```

Alpha channel only affects the `background-color`. Any text will remain fully opaque.

### [Opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
A property set on any element that governs the entire elements transparency *including its contents and any descendants*.

Similar to alpha channel, opacity is a value set over a range from 0 to 1.

```
opacity: 0.9;
opacity: 90%;
```

## The [Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) Property
Sets how an element is positioned in a document. `top`, `right`, `bottom`, `left` determine an elements final location (unless the position is static).

```
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

### [Static](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#static_positioning)
"The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no effect."

A "positioned" element is an element with a position other than static.

*This is the default value.*

### [Relative](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#relative_positioning)
"The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were static.

This value creates a new stacking context when the value of z-index is not auto. Its effect on table-*-group, table-row, table-column, table-cell, and table-caption elements is undefined."

### [Absolute](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#absolute_positioning)
"The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its closest positioned ancestor (if any) or to the initial containing block. Its final position is determined by the values of top, right, bottom, and left.

This value creates a new stacking context when the value of z-index is not auto. The margins of absolutely positioned boxes do not collapse with other margins."

### [Fixed](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#fixed_positioning)
"The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its initial containing block. Its final position is determined by the values of top, right, bottom, and left.

This value always creates a new stacking context. In printed documents, the element is placed in the same position on every page."

Can be used to make `nav` bars that stick to the top of a page.

### [Sticky](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#sticky_positioning)
"The element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and containing block (nearest block-level ancestor), including table-related elements, based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements.

This value always creates a new stacking context. Note that a sticky element "sticks" to its nearest ancestor that has a "scrolling mechanism" (created when overflow is hidden, scroll, auto, or overlay), even if that ancestor isn't the nearest actually scrolling ancestor."

Can be used to make elements that start off static then become fixed as it gets closer to its ancestor by scrolling.

## [Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) 
```
/* property name | duration | easing function | delay */
transition: margin-right 4s ease-in-out 1s;
```

The transition CSS property is a shorthand property for [transition-property](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property), [transition-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration), [transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function), and [transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay).

Transitions enable you to define the transition between two states of an element. Different states may be defined using pseudo-classes like :hover or :active or dynamically set using JavaScript.

Ensure property names are specified (as opposed to using keyword `all`) so that transitions are applied to only that element.

### Transition Timing Functions
```
/* Keyword values */
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
transition-timing-function: linear;
transition-timing-function: step-start;
transition-timing-function: step-end;

/* Function values */
transition-timing-function: steps(4, jump-end);
transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);

/* Steps Function keywords */
transition-timing-function: steps(4, jump-start);
transition-timing-function: steps(10, jump-end);
transition-timing-function: steps(20, jump-none);
transition-timing-function: steps(5, jump-both);
transition-timing-function: steps(6, start);
transition-timing-function: steps(8, end);

/* Multiple easing functions */
transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
```

#### Cubic Bezier Curves
[`cubic-bezier`](https://easings.net/) - easing functions that specify the rate of change of a parameter over time.
```
/* Function values */
transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
```

## [Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
```
/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1, 2, 3, 4, 5, 6);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: perspective(17px);
transform: rotate(0.5turn);
transform: rotate3d(1, 2, 3, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: translate(12px, 50%);
transform: translate3d(12px, 50%, 3em);
transform: translateX(2em);
transform: translateY(3in);
transform: translateZ(2px);
transform: scale(2, 0.5);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.3);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);
transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);
```

The transform CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.

If the property has a value different than none, a stacking context will be created. In that case, the element will act as a containing block for any position: fixed; or position: absolute; elements that it contains.

### [Rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate)
The rotate() CSS function defines a transformation that rotates an element around a fixed point on the 2D plane, without deforming it. Its result is a <transform-function> data type

The fixed point that the element rotates around — mentioned above — is also known as the transform origin. This defaults to the center of the element, but you can set your own custom transform origin using the transform-origin property.

### Syntax
The amount of rotation created by rotate() is specified by an <angle>. If positive, the movement will be clockwise; if negative, it will be counter-clockwise. A rotation by 180° is called point reflection.

```
transform-origin: 0 0;
transform: translate(-100%, 50%) rotate(45deg) translate(100%, -50%);
```

### Useful Transformations
[rotateX](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX)
- The rotateX() (see also [rotateY()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY), [rotateZ()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateZ)) CSS function defines a transformation that rotates an element around the abscissa (horizontal axis) without deforming it. Its result is a <transform-function> data type.

[transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
- The transform-origin CSS property sets the origin for an element's transformations.

[scale](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale)
- The scale() CSS function defines a transformation that resizes an element on the 2D plane. Because the amount of scaling is defined by a vector, it can resize the horizontal and vertical dimensions at different scales. Its result is a <transform-function> data type.

[translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)
- The translate() CSS function repositions an element in the horizontal and/or vertical directions. Its result is a <transform-function> data type.

[skew](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew)
- The skew() CSS function defines a transformation that skews an element on the 2D plane. Its result is a <transform-function> data type.

Note on [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
- `auto` value
  - The browser selects a suitable margin to use. For example, in certain cases this value can be used to center an element.

## [Google Fonts](https://fonts.google.com/)
Google Fonts is a computer font and web font service owned by Google. This includes free and open source font families, an interactive web directory for browsing the library, and APIs for using the fonts via CSS and Android.

Google Fonts allow all users regardless of which fonts they have on their machines to be able to view the same font fetched from Google.

## [Background](https://developer.mozilla.org/en-US/docs/Web/CSS/background) Property
The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method. Component properties not set in the background shorthand property value declaration are set to their default values.

```
/* Using a <background-color> */
background: green;

/* Using a <bg-image> and <repeat-style> */
background: url("test.jpg") repeat-y;

/* Using a <box> and <background-color> */
background: border-box red;

/* A single image, centered and scaled */
background: no-repeat center/80% url("../img/image.png");
```

Note that the order of the `background` property values *does not* matter except.
- The <bg-size> value may only be included immediately after <position>, separated with the '/' character, like this: "center/80%".

### [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
The background-image CSS property sets one or more background images on an element.

```
background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 0, 0.5),
    rgba(0, 0, 255, 0.5)
  ), url("catfront.png");
```

### [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.

```
/* Keyword values */
background-size: cover;
background-size: contain;

/* One-value syntax */
/* the width of the image (height becomes 'auto') */
background-size: 50%;
background-size: 3.2em;
background-size: 12px;
background-size: auto;

/* Two-value syntax */
/* first value: width of the image, second value: height */
background-size: 50% auto;
background-size: 3em 25%;
background-size: auto 6px;
background-size: auto auto;

/* Multiple backgrounds */
background-size: auto, auto; /* Not to be confused with `auto auto` */
background-size: 50%, 25%, 25%;
background-size: 6px, auto, contain;
```

### [background-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)
The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.

```
/* Keyword values */
background-repeat: repeat-x;
background-repeat: repeat-y;
background-repeat: repeat;
background-repeat: space;
background-repeat: round;
background-repeat: no-repeat;

/* Two-value syntax: horizontal | vertical */
background-repeat: repeat space;
background-repeat: repeat repeat;
background-repeat: round space;
background-repeat: no-repeat round;
```

### [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin.

```
/* Keyword values */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* <percentage> values */
background-position: 25% 75%;

/* <length> values */
background-position: 0 0;
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* Multiple images */
background-position:
  0 0,
  center;

/* Edge offsets values */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```

### Free Images
[unsplash](https://unsplash.com/)

## Extra
### [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- The box-shadow CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.

```
/* Keyword values */
box-shadow: none;

/* offset-x | offset-y | color */
box-shadow: 60px -16px teal;

/* offset-x | offset-y | blur-radius | color */
box-shadow: 10px 5px 5px black;

/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* inset | offset-x | offset-y | color */
box-shadow: inset 5em 1em gold;

/* Any number of shadows, separated by commas */
box-shadow:
  3px 3px red,
  -1em 0 0.4em olive;
```

### [cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
- The cursor CSS property sets the mouse cursor, if any, to show when the mouse pointer is over an element.

- The cursor setting should inform users of the mouse operations that can be performed at the current location, including: text selection, activating help or context menus, copying content, resizing tables, and so on. You can specify either the type of cursor using a keyword, or load a specific icon to use (with optional fallback images and mandatory keyword as a final fallback).

```
/* Keyword value */
cursor: auto;
cursor: pointer;
/* … */
cursor: zoom-out;

/* URL with mandatory keyword fallback */
cursor: url(hand.cur), pointer;

/* URL and coordinates, with mandatory keyword fallback */
cursor:
  url(cursor_1.png) 4 12,
  auto;
cursor:
  url(cursor_2.png) 2 2,
  pointer;

/* URLs and fallback URLs (some with coordinates), with mandatory keyword fallback */
cursor:
  url(cursor_1.svg) 4 5,
  url(cursor_2.svg),
  /* … ,*/ url(cursor_n.cur) 5 5,
  progress;
```

### [Whitespace](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace)
The presence of whitespace in the DOM can cause layout problems and make manipulation of the content tree difficult in unexpected ways, depending on where it is located.

Any whitespace characters that are outside of HTML elements in the original document are represented in the DOM. This is needed internally so that the editor can preserve formatting of documents. This means that:
- There will be some text nodes that contain only whitespace, and
- Some text nodes will have whitespace at the beginning or end.