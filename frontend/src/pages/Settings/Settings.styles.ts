import { styled } from 'goober'

export const Container = styled('div')`
  background: var(--background-dark);
  position: absolute;
  width: 100%;
  height: 100%;
  
  &.open {
    transform: translateX(0);
    transition: transform .5s;  
  }

  &.close {
    transform: translateX(100%);
    transition: transform .5s;
  }
`

