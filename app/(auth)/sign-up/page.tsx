import AuthForm from '@/components/AuthForm'
import React from 'react'

/**
 * Component that renders a sign-up page.
 *
 * This component checks if a user is already logged in by calling the 
 * `getLoggedInUser` function. If the user is logged in, it would typically 
 * redirect them or display a message. If not, it renders an `AuthForm` 
 * component configured for signing up new users.
 *
 * @returns {JSX.Element} - The rendered sign-up section with the `AuthForm` component.
 */
const SignUp =  async () => {
  

  return (
    <section className='flex-center size fsull max-sm-6'>
      <AuthForm type="sign-up" />
    </section>
  )
}

export default SignUp;