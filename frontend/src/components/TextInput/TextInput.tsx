import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import { Container, Input, Label } from './TextInput.styles'
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  ...props
}, ref) => {
  return <Container>
    {label && <Label>{label}</Label>}
    <Input type="text" id={props.name} ref={ref} {...props} />
  </Container>
}
)

export default TextInput
