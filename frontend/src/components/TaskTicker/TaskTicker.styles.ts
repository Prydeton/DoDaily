import { styled } from 'goober'

export const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 30px;
  color: var(--white);
  font-size: 1.2em;
`

export const TickButtonContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TickButton = styled('button')`
  background-color: var(--background-light);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px;
  width: 40px;
  height: 40px;

  &.complete {
    background-color: green;
  }
`

export const Label = styled('p')`
  vertical-align: center;
  font-size: 1.1em;
  flex: 0 0 80%;
`
