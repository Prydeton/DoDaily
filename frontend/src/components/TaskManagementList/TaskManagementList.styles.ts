import { forwardRef } from 'react'
import { styled } from 'goober'

export const Container = styled('div')`

`

export const List = styled('div')`
  & > div {
    min-width: fit-content;
  }
`

export const Row = styled('div', forwardRef)`
  margin-block: 3px;
  display: grid;
  align-items: center;
  padding-inline: 5px;
  grid-template-columns: 1fr 6fr 1fr;
  gap: 5px;

  & > svg {
    flex-shrink: 0;
  }
`

export const Label = styled('span')`
  flex: 1;
  min-width: 100px;
  span {
    display: block;
  }
`

export const ColumnLabel = styled('label')`
  flex: 1;
  font-size: var(--font-size-tiny);
  text-transform: uppercase;
  opacity: .75;
  font-weight: 600;
  letter-spacing: .1em;
`

export const ButtonContainer = styled('div')`
  box-sizing: border-box;
  display: flex;
  padding: .5em 1em;
  width: 100%;
  gap: 1em;

  &>button {
    flex: 1 1 0;
    padding: .6em 1.5em;
  }
`
