# Section 4: HTML: Next Steps & Semantics
[HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) - Latest standard of HTML

[HTML Standard](https://html.spec.whatwg.org/) - How HTML should be used.

`<!DOCTYPE html>` - Signals to the browser that the latest HTML standard is being used.

Inline elements - elements that extend horizontally

Block elements - elements that extend vertically

`<div>` - content division element; *block level* element used to group content together

`<span>` - content division element; *inline level* element used to group content together

`<hr>` - thematic break (horizontal rule) element, no closing tag

`<br>` - line break element, no closing tag

`<sub>` - subscript element

`<sup>` - superscript element

## HTML Entities
e.g. `&lt;` - inserts a less than symbol 

HTML entities are used to display reserved characters, that normally would be invalid, and are used in place of difficult to type characters.

ref. https://html.spec.whatwg.org/multipage/named-characters.html

Less than, greater than, and ampersand characters are reserved characters in HTML.
- These HTML entities should be used instead: `&lt;`, `&gt;`, and `&amp;`

HTML entities can be inserted by name or number.
e.g. Less than has name `&lt;` and number `&#60;` 

ref. https://entitycode.com/

## Semantic Markup
"What purpose or role does that HTML element have?"

def. semantic - relating to meaning

Makes HTML more accessible (e.g. for screen readers) and easier to navigate by categorizing and grouping HTML into meaningful sections.

Semantic code
```
<header>
Header content
    <nav>
    Nav bar
    </nav>
</header>
<footer>
Footer content
</footer>
```

Non-semantic code
```
<div>
Header content
    <div>
    Nav bar
    </div>
</div>
<div>
Footer content
</div>
```

Instead of `div`s use these more specific elements:
- `<section>`
- `<article>`
- `<nav>`
- `<main>`
- `<header>`
- `<footer>`
- `<aside>`
- `<summary>`
- `<details>`
- `<time>`
- `<figure>`
- `<abbreviation>`
- `<data>`

All semantic markup has the same function as `div` with the benefit of additional meaning.

VSCode Plugin
[Emmet](https://docs.emmet.io/cheat-sheet/) - built in to VSCode, helps writing HTML
Useful shortcuts
- `!` to generate the HTML boilerplate code
- `main>section>h1` to generate child (nested) elements
- `h1+h2+h2` to generate sibling (adjacent) elements
- `ul>li*4` to create multiple elements of the same type
- `$` is used for numbering
- `{}` add text in between opening and closing tags