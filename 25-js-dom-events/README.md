# Section 25: DOM Events

- [Events](#events)
  - [Inline Events](#inline-events)
  - [`onclick` Property](#onclick-property)
  - [`addEventListener`](#addeventlistener)
  - [Random Color Exercise](#random-color-exercise)
- [Events & the Keyword `this`](#events--the-keyword-this)
- [The Event Object](#the-event-object)
  - [Keyboard Events](#keyboard-events)
- [Form Events](#form-events)
- [Change & Input Events](#change--input-events)
- [Bubbling](#bubbling)
- [Event Delegation](#event-delegation)

## [Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
Events provide a way to respond to user input and actions. These input and actions include,
- clicks
- drags
- drops
- hovers
- scrolls
- form submission
- key presses
- focus/blur
- mouse wheel
- double click
- copying
- pasting
- audio start
- screen resize
- printing

### Inline Events
Inline events are events written as an HTML tag's attribute.

```
<button onclick="alert('you clicked me!'); alert('stop clicking!')">Click Me!</button>
```

### [`onclick` Property](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
An element receives a `click` event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element.

If the button is pressed on one element and the pointer is moved outside the element before the button is released, the event is fired on the most specific ancestor element that contained both elements.

`click` fires after both the [mousedown](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event) and [mouseup](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event) events have fired, in that order.

Syntax
```
addEventListener("click", (event) => {});

onclick = (event) => {};
```

### [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
 The `addEventListener()` method of the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface sets up a function that will be called whenever the specified event is delivered to the target.

Common targets are [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), or its children, [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), and [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window), but the target may be any object that supports events (such as [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)).

Syntax
```
addEventListener(type, listener)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)
```

```
const button = document.querySelector("h1");
button.addEventListener("click", () => {
    alert("You clicked me!!")
})
```

For a list of event types see [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events).

### Random Color Exercise
Change the background color to a random color whenever a button is clicked. See RandomColors folder for exercise.

## [Events & the Keyword `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#this_in_dom_event_handlers)

When a function is used as an event handler, its `this` parameter is bound to the DOM element on which the listener is placed (some browsers do not follow this convention for listeners added dynamically with methods other than [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)).

```
// When called as a listener, turns the related element blue
function bluify(e) {
  // Always true
  console.log(this === e.currentTarget);
  // true when currentTarget and target are the same object
  console.log(this === e.target);
  this.style.backgroundColor = "#A5D9F3";
}

// Get a list of every element in the document
const elements = document.getElementsByTagName("*");

// Add bluify as a click listener so when the
// element is clicked on, it turns blue
for (const element of elements) {
  element.addEventListener("click", bluify, false);
}
```

## The [Event Object](https://developer.mozilla.org/en-US/docs/Web/Events)
The event object is automatically passed to callback functions inside of event listeners. It contains information about the event that it had listened to.

`e` captures the event object and is printed to the console.
```
document.querySelector("button").addEventListener("click", function (e) {
    console.log(e);
})
```

### Keyboard Events
Keyboard events can be listened to using the `keyup`, `keydown`, and `keypress` event types. The event object returned is the `KeyboardEvent` object containing properties such as `key`, `code`, `location`, etc.

Accessing the `KeyboardEvent`.
```
const input = document.querySelector("input");

input.addEventListener("keydown", function (e) {
    console.log(e); // KeyboardEvent
    console.log(e.key); // prints the key pressed, e.g. `f`
    console.log(e.code); // prints the key code, e.g. "KeyF"
})
```

## Form Events
The [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#events) interface represents a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) element in the DOM. It allows access to—and, in some cases, modification of—aspects of the form, as well as access to its component elements.

Recall that the default behavior of a form is to send the data submitted in the form to some other location using the `action` attribute after a button has been pressed.

Submit button sends data to `/shelter`.
```
<h1>My Form</h1>
<form id="shelterForm" action="/shelter">
  <input type="text" />
  <button>Submit</button>
</form>
```

To prevent this default behavior use the Event object method [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault).
```
const form = document.querySelector(#shelterForm);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("SUBMITTED THE FORM!");
})
```

## [Change](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) & [Input](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) Events
The `change` event is fired for `<input>`, `<select>`, and `<textarea>` elements when the user modifies the element's value. Unlike the `input` event, the `change` event is not necessarily fired for each alteration to an element's `value`.

Syntax
```
addEventListener("change", (event) => {});

onchange = (event) => {};
```

The `input` event fires when the value of an `<input>`, `<select>`, or `<textarea>` element has been changed.

Syntax
```
addEventListener("input", (event) => {});

oninput = (event) => {};
```

## Bubbling
When events are nested a bubbling up effect takes place where the inner event triggers first up to the outer event.

Alert order: `button`, `p`, then `section`
```
<section onclick="alert('section clicked')">
    <p onclick="alert('paragraph clicked')">
        I am a paragraph:
        <button onclick="alert('button clicked')">Click</button>
    </p>
</section>
```

In some cases bubbling may not be preferred particularly if elements, each with their own standalone events, are nested. To prevent this event propagation from occurring use the event object's [`stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) method.

The `stopPropagation()` method of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface prevents further propagation of the current event in the capturing and bubbling phases. It does not, however, prevent any default behaviors from occurring; for instance, clicks on links are still processed. If you want to stop those behaviors, see the [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) method. It also does not prevent propagation to other event-handlers of the current element. If you want to stop those, see [stopImmediatePropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation). 

Syntax
```
event.stopPropagation()
```

## [Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
Bubbling can be useful, in particular, it enables **event delegation**. In this practice, the user interacts with any one of a large number of child elements, with the event listener on their parent the events that happen on them bubble up to their parent rather than having to set the event listener on every child individually.

Example of event delegation where a UL of tweets adds an event that deletes its LI when clicked. This is event delegation because the LI are children of the UL that includes a `click` event. When an LI is clicked, the event bubbles up to the UL containing the action to delete it.
```
<ul id="tweets">
    <li>I AM LI!!!</li>
    <li>I AM LI!!!</li>
    <p>aslkdjaslkdjaksl</p>
</ul>
```

```
const tweetsContainer = document.querySelector('#tweets');

tweetsContainer.addEventListener('click', function (e) {
    e.target.nodeName === 'LI' && e.target.remove();
})
```
Note that the paragraph will not be deleted because it is not an LI.