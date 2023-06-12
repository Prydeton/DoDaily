import { styled } from 'goober'

export const Cover = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: var(--shadow);
  opacity: 1;

  &.open {
    transform: translateY(0%);
    opacity: 1;
    transition: opacity 0.5s;
  }

  &.close {
    transform: translateY(100%);
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s 0.5s;
  }
`

export const Container = styled('div')`
  background: var(--background-dark);
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 0;
  left: 0;
  z-index: 2;

  &.open {
    transform: translateY(0%);
    transition: transform .5s;  
  }

  &.close {
    transform: translateY(100%);
    transition: transform .5s;
  }
`

export const CloseDrawButton = styled('button')`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 15px;
  margin: 0;
  color: white;
`
