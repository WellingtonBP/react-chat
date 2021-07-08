import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --lightGrayishBlue: #D3D5D6;
    --darkGrayishBlue: #639CB9;
    --darkBlue: #1F528D;
    --dark: #272121;
    --danger: #B01C1C;
    --green: #2DC04D;
    --darkGreen: #4BAC60;
    --red: #B54B4B;
    font-size: 62.5%;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, input, button {
    font-family: 'Reem Kufi', sans-serif;
  }
`
