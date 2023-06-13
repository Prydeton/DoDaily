import { styled } from 'goober'

export const Container = styled('div')`
  background: var(--background-dark);
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 400px) {
    width: 400px;
  }

  &.open {
    transform: translateX(0);
    transition: transform .3s;  
  }

  &.close {
    transform: translateX(100%);
    transition: transform .3s;
  }
`

