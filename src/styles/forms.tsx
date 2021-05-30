import { css, Global } from '@emotion/react'

const formCss = css`
  /* Reset */
  input,
  label,
  select,
  button,
  textarea {
    display: inline-block;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1em;
    line-height: normal;
    font-family: inherit;
    font-weight: 400;
    white-space: normal;
    vertical-align: middle;
    background: none;
    box-sizing: border-box;
  }

  /* Remove the outer glow in Webkit */
  input:focus,
  textarera:focus {
    outline: 0;
  }

  /* Labels */
  label {
    font-size: 1em;
  }

  /* Numbers ... */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  /* Date/Time/week... */
  input[type='date'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='month'],
  input[type='time'],
  input[type='week'] {
    /* width:50%; */
    padding-bottom: 0;
    text-transform: uppercase;
    letter-spacing: 1px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button,
    &::-webkit-clear-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }

    &::-webkit-calendar-picker-indicator {
      display: none;
      background: none;
    }
  }

  /* Search Input (WebKit reset) */
  /* Make webkit render the search input like a normal text field */
  input[type='search'] {
    -webkit-appearance: textfield;
  }

  /* Turn off the recent search for webkit. It adds about 15px padding on the left */
  ::-webkit-search-decoration {
    display: none;
  }

  /* File Uploads */
  input[type='file'] {
    width: 99%;
    margin: 3px 0 15px;
    padding: 0 1% 0 0;
  }

  ::-webkit-file-upload-button {
    overflow: visible;
    width: auto;
    display: inline-block !important;
    cursor: pointer;
    font-size: 1em;
    padding: 5px 7px;
  }

  /* Textarea */
  textarea {
    overflow: auto;
    vertical-align: top;
    resize: vertical;
  }

  select[multiple] {
    vertical-align: top;
  }
`

export function FormsCss () {
  return <Global styles={formCss} />
}
