# Section 8: The CSS Box Model
*Everything in CSS is a box.*

These boxes are composed of:
- [Margin](#margin)
- [A border](#border)
- [Padding](#padding)
- [An inner box of content](#inner-content-box)

## Inner Content Box
Properties associated with the inner box content:
- [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
- [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height)

## [Border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
The border around an element containing the padding and inner content.

```
/* width | style | color */
border: medium dashed green;
```

Properties associated with the border:
- [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width) - control the thickness of the border
- [`border-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) - controls the color of the border
- [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) - controls the roundness of a borders corners
- [`border-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style) - controls the line style (dashed, solid, etc.) of the border
```
/* top-left | top-right | bottom-right | bottom-left */
border-radius: 1px 0 3px 4px;

/* top | right | bottom | left */
border-style: none solid dotted dashed;
```

### Border Units
Pixels `px` are the preferred units for borders since borders are small.

### [`box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
Contains the border within the width and height of the element as opposed to extending it.
- Without `box-sizing` an element with `width:200px` will become 200px+`border-width`.
- With `box-sizing` the same element will contain `border-width` within its 200px width.

## [Padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
The space between the content box and the border of an element.

### Individual Properties
- `padding-left` - apply padding to left
- `padding-right` - apply padding to right
- `padding-bottom` - apply padding to bottom
- `padding-top` - apply padding to top

### Shorthand Padding Properties
```
/* Apply to all four sides */
padding: 1em;

/* top and bottom | left and right */
padding: 5% 10%;

/* top | left and right | bottom */
padding: 1em 2em 2em;

/* top | right | bottom | left */
padding: 5px 1em 0 2em;
```

## Margin
The space outside of an elements border i.e. the space between elements.

### Individual Properties
- `margin-left` - apply margin to left
- `margin-right` - apply margin to right
- `margin-bottom` - apply margin to bottom
- `margin-top` - apply margin to top

### Shorthand Margin Properties
```
/* Apply to all four sides */
margin: 1em;
margin: -3px;

/* top and bottom | left and right */
margin: 5% auto;

/* top | left and right | bottom */
margin: 1em auto 2em;

/* top | right | bottom | left */
margin: 2px 1em 0 auto;
```

## The Display Property
Recall
- Inline elements - elements fit in alongside other elements
- Block elements - elements take up a whole "block" of space

[`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) gives control over the element layout with the following properties
- `inline` - width and height are ignored, margin and padding push elements away horizontally but not vertically
- `block` - elements break the flow of a document, width, height, margin, and padding are respected
- `inline-block` - behave like an inline element expect width, height, margin, and padding are respected
- `none` - hides the element

## [Units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
Recall
- Relative units: `em`, `rem`. `vh`, `vw`, `%`, etc.
- Absolute units: `px`, `pt`, `cm`, `in`, `mm`

### Relative Units
- `%` - percentages are always relative to some other value
  - sometimes the value is from the parent, other times, from the element itself
  - `width: 50%` - half the width of the parent
  - `line-height: 50%` - half the font-size of the element itself
- `em` - originates from typography related to the uppercase letter 'M'
  - font-size - 1 em equals the font-size of the parent, 2 ems is twice the parent's font-size
  - other properties - 1 em is equal to the computed font-size of the element
- `rem` - **root** `em`
  - relative to the *root* html element's font-size (easier to work with than `em`)
  - with root font-size of 20px, 1 rem is always 20px, 2 rem is 40px, etc.

### Absolute Units
`px` pixels are the most commonly used absolute units.