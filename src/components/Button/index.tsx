import styled from 'styled-components'

import { Color } from '../../config/styles/colors'
import { ButtonProps } from '../../config/types'

const Button = styled.button<ButtonProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? Color.PRIMARY : 'transparent')};
  color: ${(props) => (props.primary ? '#fff' : Color.PRIMARY)};

  cursor: pointer;

  :hover {
    background: ${(props) => (props.primary ? 'transparent' : Color.PRIMARY)};
    color: ${(props) => (props.primary ? Color.PRIMARY : '#fff')};
  }

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${Color.PRIMARY};
  border-radius: 3px;
`

export default Button
