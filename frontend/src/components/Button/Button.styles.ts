import { forwardRef } from 'react'
import { styled } from 'goober'

export const StyledButton = styled('button', forwardRef)`
  padding: .6em 1.5em;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--white);
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  
  &[data-surface='true'] {
    background: var(--surface);
  }

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
  `};
`
