import { styled } from 'goober'

export const PageContainer = styled('div')`
  background: var(--background-light);
  position: absolute;
  width: 100%;
  height: 100%;
`

export const ControlsContainer = styled('div')`
  width: 100%;
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
`

export const ControlMonth = styled('h2')`
  padding: 0;
  margin: 0;
`

export const MonthContainer = styled('div')`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, 71px);
  justify-content: space-between;
  gap: 1em;
`
