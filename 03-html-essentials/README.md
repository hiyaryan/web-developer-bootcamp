# HTML
Hypertext Markup Language

## HTML Elements
[Elements MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
* `<p>` - represents a paragraph of text
* `<h1>` - represents the main header
* `<img>` - embeds an image
* `<form>` - represents a form
* `<a>` - represents a link to a resource
* `<img>` - represents an image resource (has no closing tag)

## HTML Tags
* Opening tag: `<p>`
* Closing tag: `</p>`

## HTML Attributes
Information passed into a tag, e.g., `href`.
* `<a href="">`

### `href`
* Depending on the file transfer protocol determines how the resource will be retrieved.
* When clicked
  * `href="google.com"` -> `file:///Users/ryan/Dev/web-developer-bootcamp/3-html-essentials/google.com`
  * `href="http://google.com"` -> `https://www.google.com/`

## Comments
* Write comments using `<!-- Comment here -->`
* VSCode shortcut `command + /`

## HTML Skeleton
Boilerplate code for all html documents.
```
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- Content Goes Here -->>
</body>
</html>
```

### VSCode 
#### Autocomplete
In VSCode, HTML boilerplate can be autocompleted by typing `!` followed by `tab`.

#### Auto-format
1. Shortcut key combo: `option + shift + F`.
2. Format On Save: option in settings.
