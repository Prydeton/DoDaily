import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, TextInput } from '/src/components'
import { useAuthStore } from '/src/Stores'

import { FormWrapper } from '../../Auth.styles'

const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupError, setSignupError] = useState('')

  const { signup } = useAuthStore()

  const defaultValues = {
    email: '',
    password: ''
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({ email, password }: { email: string, password: string }) => {
    setIsSubmitting(true)
    try {
      await signup(email, password)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<FormWrapper onSubmit={handleSubmit(onSubmit)}>
    <TextInput
      label="Email"
      {...register('email', {
        required: 'You must enter your email',
      })}
      type="email"
      placeholder="james.bond@gmail.com"
      required
    />
    <TextInput
      label="Password"
      {...register('password', {
        required: 'You must enter your password',
      })}
      type="password"
      required
    />
    <Button type="submit" disabled={!isDirty || isSubmitting} surface>Signup</Button>
  </FormWrapper>)
}

export default Login
