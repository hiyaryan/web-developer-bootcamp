# Section 70: Effects

- [Effects Intro](#effects-intro)
  - [Recap on Rendering and State](#recap-on-rendering-and-state)
  - [Rendering and Effects](#rendering-and-effects)
- [The `useEffect` Hook](#the-useeffect-hook)
- [`useEffect` Dependencies](#useeffect-dependencies)
- [Fetching Initial Data From an API](#fetching-initial-data-from-an-api)
  - [Getting Data via AJAX on mount](#getting-data-via-ajax-on-mount)
- [Adding a Loader](#adding-a-loader)
- [GitHub Profile Search](#github-profile-search)

## Effects Intro
### Recap on Rendering and State
1. A state setter function is called
2. The code finishes running
3. The component re-renders
4. In this re-render, state will be set to the new value

*Effects* or *side-effects* can be applied after a render or re-render.

### Rendering and Effects
Effects are for doing something after, and unrelated to, a render. This is useful for a variety of reasons, for instance,
- Changing parts of the DOM not covered by React
- Async operations, like AJAX requests **when a component is mounted**
- Doing things when a component is about to be *unmounted*

Effects are used for *side-effects*-doing things unrelated to render.

## The `useEffect` Hook
[`useEffect`](https://react.dev/reference/react/useEffect) is a React Hook that lets you [synchronize a component with an external system](https://react.dev/learn/synchronizing-with-effects).

Syntax
```jsx
useEffect(setup, dependencies?)
```

To use an effect, register it with *useEffect(fn)*.

Register `mySideEffect`.
```jsx
import { useEffect } from 'react';

export default function MyComponent() {
    function mySideEffect() {
        // ... do something
    }

    useEffect(mySideEffect);

    // rest of component
}
```

It is more common to inline the effect in `useEffect`.
```jsx
import { useEffect } from 'react';

export default function MyComponent() {
    useEffect(function mySideEffect() {
        // ... do something
    });

    // rest of component
}
```

In the `useEffect` usage example above,
- `mySideEffect` always runs *after* the first render
- by default, *mySideEffect* runs after all re-renders
- my effect can do whatever is needed
  - If it sets state, another render will be triggered
  - `mySideEffect` will run *after* that re-render.

## `useEffect` Dependencies
The second parameter in `useEffect` is for setting dependencies.

- `useEffect(myCallbackFn);`
  - Runs `myCallbackFn` effect after *every* render
- `useEffect(myCallbackFn, [productId, userId]);`
  - Runs `myCallbackFn` effect only if *productId* and *userId* vars changed
- `useEffect(myCallbackFn, [ ]);`
  - Runs `myCallbackFn` only on the first render, on *mount* (when the component is successfully inserted into the DOM)

Run effect only when a `count` state variable is updated.
```jsx
useEffect(() => {
    console.log(`Count is: ${ count }`);
}, [count])
```

## Fetching Initial Data From an API
One of the most common usages of `useEffect` is to fetch data from an API on the initial render.

### Getting Data via AJAX on mount
- When a component renders, fetch data from an API
  - Data fetching is asynchronous, and may take a moment to complete
  - Ideally, you would want to show a user something, like a loading message, while fetching
- To fetch correctly
  - Have an effect that runs only once
  - Inside effect when the API call finishes, it will set the state and trigger a re-render

## Adding a Loader
To improve user experience while data is being fetched through an API, add loading state.

This component renders the `<p>` tag only if the `isLoading` is `true` and removes it from the document once the component is re-rendered through the `useEffect` hook.
```jsx
import { useEffect } from "react";
import { useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

export default function QuoteFetcherLoader() {
    const [quote, setQuote] = useState({ text: "", author: "" });
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAndSetQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.quote;
            setQuote(randomQuote);
            setLoading(false)
        }

        fetchAndSetQuote();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            <h3>{quote.text}</h3>
            <h5>{quote.author}</h5>
        </div>
    )
}
```

Note
- To test user experience over a range of internet connections (e.g. 2G, 3G, 4G, Wi-Fi, etc) see the `Throttling` dropdown in the Network tab of the browser (same for Firefox and Chrome).

To make it more visually appealing add a transition to the elements styles.
```css
.Loader {
    transition: 1s opacity;
}
```

## GitHub Profile Search
This `useEffect` demo searches GitHub for a user profile and extracts the users profile picture and name. See `src/ProfileSearchForm.jsx` and `src/ProfileViewerWithSearch.jsx` in `react-effects` for the source code.