# Section 71: Material UI

- [Material UI Intro](#material-ui-intro)
- [Installing Material UI](#installing-material-ui)
  - [Roboto font](#roboto-font)
- [The Rating Component](#the-rating-component)
- [Material Forms](#material-forms)
- [The SX Prop and Custom Styles](#the-sx-prop-and-custom-styles)
  - [The SX prop](#the-sx-prop)
  - [Spacing](#spacing)
  - [App Bar](#app-bar)

## Material UI Intro
[Material UI](https://mui.com/) (MUI) offers a comprehensive suite of free UI tools to help you ship new features faster. Start with Material UI, MUI's fully-loaded component library, or bring your own design system to MUI's production-ready components.

See [MUI core](https://mui.com/core/) for a list of ready to use foundational React components. See [Material UI](https://mui.com/material-ui/) in MUI core for a library of React UI components that implements Google's Material Design then click on [Getting Started](https://mui.com/material-ui/getting-started/) to view available components.

## Installing Material UI
Install material UI with [npm](https://www.npmjs.com/package/@mui/material).
```bash
$ npm install @mui/material @emotion/react @emotion/styled
```

### Roboto font
Material UI uses the Roboto font by default. Add it to your project via Fontsource, or with the Google Fonts CDN.
```bash
$ npm install @fontsource/roboto
```

See `BasicButton.jsx` for an example on how to import MUI components, in particular, importing a [Basic button](https://mui.com/material-ui/react-button/#basic-button) and how to change its color, icon, or size.

## The Rating Component
See `BasicRating.jsx` for an example on how to import and use a MUI [Rating](https://mui.com/material-ui/react-rating/) component that contains JavaScript behind it.

From the docs, Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.

## Material Forms
See `FormDemo.jsx` for a demo using MUI components, [Text Field](https://mui.com/material-ui/react-text-field/), [Continuous slider](https://mui.com/material-ui/react-slider/#continuous-sliders), and a [Basic Select]() , to build a form.

## The SX Prop and Custom Styles
Some generic components that are often used together in Material UI are,
- [Box](https://mui.com/material-ui/react-box/) - The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.
`Box` has an [`sx`](https://mui.com/material-ui/api/box/#Box-prop-sx) property which is the[ system prop](#the-sx-prop) that allows defining system overrides as well as additional CSS styles.

### [The `sx` prop](https://mui.com/system/getting-started/the-sx-prop/)
The sx prop is a shortcut for defining custom styles that has access to the theme.

The `sx` prop lets you work with a superset of CSS that packages all of the style functions exposed in `@mui/system`. You can specify any valid CSS using this prop, as well as many [*theme-aware* properties](https://mui.com/system/getting-started/the-sx-prop/#theme-aware-properties) that are unique to MUI System.

#### Basic `sx` example
The following demo illustrates how to work with the `sx` prop. Note that not all of the values are valid CSS properties—that's because the `sx` keys are mapped to specific properties of the theme.
```jsx
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          98.3 K
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last week
        </Box>
      </Box>
    </ThemeProvider>
  );
}
```

### Spacing
The spacing properties `margin`, `padding`, and the corresponding longhand properties multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`):

```jsx
<Box sx={{ margin: 2 }} />
// equivalent to margin: theme => theme.spacing(2)
```

Some non-CSS props and their CSS equivalents in Material UI can be seen in [Spacing](https://mui.com/system/getting-started/the-sx-prop/#spacing) (e.g. `m` is `margin`, `p` is `padding`, etc.)

### App Bar
See `src/Navbar.jsx` for an example of using a MUI [App Bar](https://mui.com/material-ui/react-app-bar/) component.