import { forwardRef } from 'react'
import { styled } from 'goober'

export const StyledButton = styled('button', forwardRef)`
  border-radius: 5px;
  background: transparent;
  border: none;
  color: var(--white);
  display: grid;
  place-items: center;

  &[data-surface='true'] {
    background: var(--surface);
  }

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
  `};
`
