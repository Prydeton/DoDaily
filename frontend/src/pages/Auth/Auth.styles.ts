import { styled } from 'goober'

export const Container = styled('div')`
  box-sizing: border-box;
  height: 100vh;
  background: var(--background-extra-dark);
  display: flex;
  flex-direction: column;
  padding-inline: 2em;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

export const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
`

export const Heading = styled('h1')`
  color: var(--white);
  font-size: 2em;
  margin: 0;
`

export const SwapForm = styled('p')`
  display: inline;
  text-decoration: underline;
`
