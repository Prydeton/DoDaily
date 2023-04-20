import { styled } from 'goober'

export const Wrapper = styled('div')`
  padding: .45em;
  cursor: grab;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);

  &:active {
    cursor: grabbing;
  }
`
