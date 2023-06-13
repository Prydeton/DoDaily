import { styled } from 'goober'

export const PageContainer = styled('div')`
  background: var(--background-light);
  position: absolute;
  width: 100%;
  height: 100%;
`

export const ControlsContainer = styled('div')`
  width: 100%;
  width: 380px;
  margin: auto;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ControlButton = styled('button')`
  border: none;
  background: var(--background-dark);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
  `};
`

export const ControlMonth = styled('h2')`
  padding: 0;
  margin: 0;
  min-width: 111px;
  display: grid;
  place-content: center;
`

export const MonthContainer = styled('div')`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export const Days = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 71px);
  justify-content: space-between;
  gap: 1em;
  padding: 20px;
`
