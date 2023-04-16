import { styled } from 'goober'

export const Container = styled('nav')`
  background: var(--background-extra-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NavActionItem = styled('button')`
  margin: 0;
  padding: 10px;
  border: none;
  background: inherit;
  color: var(--white);
  size: 3em;
`

export const NavTitleItem = styled('a')`
  font-size: 1.5em;
`
