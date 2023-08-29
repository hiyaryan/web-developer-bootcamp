# Section 6: CSS: The Very Basics

## What is CSS
CSS - Cascading Style Sheets

Describes how documents are presented visually or arranged and styled.

[MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

## CSS Rules
Almost everything in CSS follows this basic pattern

```
selector {
    property: value;
}
```

Ex. Make all `<h1>` elements purple.
```
h1 {
    color: purple;
}
```

Ex. Select every other text input and give it a red border.
```
input[type="text"]:nth-of0type(2n) {
    border: 2px solid red;
}
```

Ex. Make all image elements 100 pixels wide & 200 pixels tall.
```
img {
    width: 100px;
    height: 200px;
}
```

Semicolons are required at the end of every property-value line. 

## Including Styles
Styles can be written *inline*, inside of a *`<style>`* element, or inside of an external *stylesheet*. 

*stylesheets* are recommended because the styles can be shared over the entire document.

## Color
[MDN Color Demo](https://developer.mozilla.org/en-US/docs/Web/CSS/color)

`color` property changes the text color.

`background-color` change the background color.

### Color Systems
#### I. [Named colors](https://htmlcolorcodes.com/color-names/)
e.g. hotpink, mediumorchid, firebrick, gold, tomato, etc

#### II. RGB (Red Green Blue) Channels
Additive color system ranging from 0 to 255
- rgb(255, 0, 0) is red
- rgb(0, 255, 0) is green
- rgb(0, 0, 255) is blue
- rgb(173, 20, 219) is a purple color
- rgb(0, 0, 0) is black

[Color Picker](https://htmlcolorcodes.com/color-picker/)


#### III. Hexadecimal
RGB Channels represented with hexadecimal: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
- `#` (octothorpe) symbol signals that the hexadecimal value represents a color.
- #ffff00 is yellow
  - ff (255): red channel, ff (255): green channel, 00 (0): blue channel
- #0f5679 is a gray color
  - 0f: red channel, 56: green channel, 79: blue channel
- Channels with double the same hex digit can be shortened to use only one hex digit.
  - #000000 is black, can also be written #000
  - #cc55ee is a pink color, can also be written #c5e


## Text Properties
### Basic Properties
- [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) - set the horizontal alignment within an element 
- [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) - control the boldness of the text
  - words: normal, bold, lighter, bolder
  - numbers: 100, 200, 300, ..., 900, 400 is normal
- [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) - set appearance of decorative lines on text
- [line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) - set distance between line of text
- [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) - control space between letters

### Font Size
- [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) - change the size of the font

Values
- Absolute size
  - `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`, `xxx-large`
- Relative size
  - `smaller`, `larger`
- Length
  - `12px`, `0.8em`
- Percentage
  - `80%`
- Global
  - `inherit`, `initial`, `revert`, `revert-layer`, `unset`

Relative Units
- `em`
- `rem`
- `vh`
- `vw`
- `%`

Absolute Units
- `px`
- `pt`
- `cm`
- `in`
- `mm`

Common Unit: `px`
- Absolute unit does not depend on the size of any other element in the document.
- `1px` does not necessarily equal the width of one pixel
- not recommended for responsive websites

### Font Family
- [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) - change the font of text
  - every OS comes built with a set of [common fonts](https://www.cssfontstack.com/) not necessarily shared between all of them
- font stack - a list of fonts such that if the first font is not available the next font is used
  - e.g. `Gill Sans Extrabold, sans-serif`
    - family-name - `Gill Sans Extrabold`
    - generic-name - `sans-serif`
      - if none from family-name exist, then use any font from sans-serif