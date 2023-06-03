import { forwardRef } from 'react'
import { styled } from 'goober'

export const Input = styled('input', forwardRef)`
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 7px;
  color: var(--white);
  background: var(--background-light);
  padding-block: .5em;
  padding-inline: .5em;
  outline: none;
  border: none;
`

export const Label = styled('label')`
  display: block;
`

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: .5em;
`
