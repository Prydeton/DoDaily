import { styled } from 'goober'

export const PageContainer = styled('div')`
  background: var(--background-dark);
  position: absolute;
  width: 100%;
  height: 70%;
  
  &.open {
    transform: translateY(-100%);
    transition: transform .5s;  
  }

  &.close {
    transform: translateY(0);
    transition: transform .5s;
  }
`
