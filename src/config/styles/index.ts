import * as styled from 'styled-components'
import { Color } from './colors'

const fullStyling = styled.css`
  width: 100%;
  height: 100%;
`

export default styled.createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;

    ${fullStyling};

    font-family: Arial, Helvetica, Arial, sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${fullStyling};
  }

  .link {
    font-size: bold;
    color: ${Color.SECONDARY};

    :hover {
      color: #000;
    }
  }
`
