# Section 5: HTML: Forms & Tables
## Tables
Tables are structured sets of data made of rows and columns.

### Table Elements
- `<table>`
- `<td>` - data cells
- `<tr>` - data rows
- `<th>` - data headers
- `<thead>` - indicates header section of the table
- `<tbody>` - indicates body section of the table
- `<tfoot>` - indicates footer section of the table
- `<colgroup>`
- `<caption>`
- `<colspan>` - span multiple columns
- `<rowspan>` - span multiple rows

## Forms
Forms are containers used to collect data through input.

### Form Elements
- `<form>` - represents a document section containing interactive elements
  - `action` - specifies where the form data should be sent
  - `method` - specifies which HTTP method should be used

### Common Input Types
- `<input>` - used to create a variety of different form controls
  - `type` - describes the input's behavior and appearance
    - `="color"`
    - `="number"` - a field that only allows numbers
      - `min` - minimum value that can be selected
      - `max` - maximum value that can be selected
      - `step` - step through the range of numbers by some factor
    - `="text"` - default input type is text field
    - `="password"` - textfield where each character is written as a asterisk
    - `="button"` (more commonly, `<button>`)
    - `="radio"`
      - `value` - assigns a value to the radio button passed to the url on submit
    - `="checkbox"`
    - `="range"` - a slider used to specify a numeric value
      - `min` - minimum value that can be selected
      - `max` - maximum value that can be selected
      - `step` - step through the range of numbers by some factor
      - `value` - initial value of the slider
  - `name` - name of the value passed to the url on submit e.g. `name="username"` url `file:///tacos?username=chicken`
  - ref.: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- `<label>` - represents a caption for an item

### Buttons
- `<button>` - used to submit forms
  - `type` - describes the buttons behavior, default is to submit

### Selects
- `<select>` - a dropdown menu
- `<option>` - an item of the select element placed in between opening and closing select tags
  - `value` - assigns a value to the option selected passed to the url on submit
- ref.: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select

### Text Areas
- `<textarea>` - an area where text can be written
  - `cols` - number of columns visible until scrollbar appears
  - `rows` - number of rows visible until scrollbar appears
  - `placeholder` - placeholder text

### Form Validations
Ensuring the input conforms to some valid pattern required to submit the form.

- `required` - attribute added to input tags indicating a required field
- `pattern` - attribute added to input tags indicating a specific required pattern
  - Built-in input patterns for `type`
    - `email`
    - `url`
    - `tel`
    - `password`
    - `text`
    - `search`
    - ref.: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern