import { forwardRef } from 'react'

import { StyledButton } from './Button.styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  icon?: React.ReactNode
  surface? : boolean
}

const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({
  loading,
  icon,
  children,
  surface = false,
  ...rest
}: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  return <StyledButton ref={ref} data-surface={surface} {...rest} >
    {loading && 'hi'}
    {icon}
    {children}
  </StyledButton>
})

export default Button
