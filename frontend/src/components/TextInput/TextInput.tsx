import { Input } from './TextInput.styles'

export interface TextInputProps {
  value?: string
  onChange: React.ComponentProps<'input'>['onChange']
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }: TextInputProps) => {
  return <Input onChange={onChange} value={value} />
}

export default TextInput
