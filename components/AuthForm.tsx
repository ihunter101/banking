'use client'


import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

/* Building a form field using the following imports*/
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import  CustomInput  from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/useractions'




/**
 * A component that renders a form for authentication (sign in or sign up). The type of form
 * is determined by the type prop. If the type is 'sign-in', the form will have fields for email
 * and password. If the type is 'sign-up', the form will have fields for first name, last name, address,
 * state, postal code, date of birth, contact number, and SSN in addition to email and password.
 * The form will also have a button to submit the form. If the user is signed in, the form will be
 * replaced with a message to link their account to Horizon.
 * @param {{type: string}} - The type of form to render. Can be 'sign-in' or 'sign-up'
 * @returns {JSX.Element} - The rendered form
 */
const AuthForm =  ({ type } : { type:string }) => {
  const router = useRouter();
  console.log('Type:', type);


    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    

    {/*we had to tunr authFormSchema into a function 
      to pass the type (sign in or sign out) to 
      generate a zod schema based on the type passed
      */}
    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })
     
      // 2. Define a submit handler.
      const onSubmit = async (data: z.infer<typeof formSchema>) =>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);

        try {
         
          if (type === 'sign-up') {
            const newUser = await signUp(data)//this only takes the email and password as input since this is what being accepted in signUp function in useractions.ts
            setUser(newUser)
          }
            
          if(type === 'sign-in') {
           const response = await signIn({
           email : data.email,
           password : data.password
          })
          if (response) router.push('/')// if the response is vakid then oush the user to the homePage
        };console.log('working')
          
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false); //stop the loading no matter what and allows the user to try again
        }
        
      }
      
    

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
             <Link href='/' className=' flex cursor-pointer items-center gap-1' >
                 <Image 
                    src='/icons/logo.svg'
                    width= {34}
                    height= {34}
                    alt= "Horizon logo"
            />
                 <h1 className="Text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                {user 
                ? 'Link Account' 
                : type === 'sign-in'
                ? 'Sign In' 
                :'Sign Up'
                }
                 <p className='text-16 font-normal text-gray-600'>
                    {user 
                    ? 'Link your account to Horizon'  
                    :'Please enter your details.'}
                 </p>
            </h1>
        </div>
        </header>

        {user ? (
         <div className='flex flex-col gap-4'> 
            {/* {PlaidLink} */}
        
        </div>):(
            <>
                    <Form {...form}> {/*form hook from react hook is passes to the Form component from shadcn */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">{/*the form hook is used as a wrapper for an html form  which has an onsubnit handle*/}
                      
                          {type === 'sign-up' &&(
                            <>
                            <div className='flex gap-4'>
                               <CustomInput 
                             control={form.control}
                             name='firstName'
                             label='First Name'
                             placeholder='Enter your first name'
                            />
                            <CustomInput 
                             control={form.control}
                             name='lastName'
                             label='Last Name'
                             placeholder='Enter your last name'
                            />
                            </div>
                           
                            <CustomInput 
                             control={form.control}
                             name='address1'
                             label='Address'
                             placeholder='Enter your specific address'
                            />
                            <div className='flex gap-4'>
                              <CustomInput 
                              control={form.control}
                              name='state'
                              label='State'
                              placeholder='ex: NY'
                              />
                              <CustomInput 
                              control={form.control}
                              name='postalCode'
                              label='Postal Code'
                              placeholder='Enter your postal code'
                              />
                            
                            </div>
                               <CustomInput 
                                control={form.control}
                                name='city'
                                label='city'
                                placeholder='Enter your city'
                                />
                              <CustomInput 
                              control={form.control}
                              name='contactNumber'
                              label='Contact Number'
                              placeholder='ex: +1 758 1234-5678'
                              />
                            
                            <div className='flex gap-4'>
                              <CustomInput 
                              control={form.control}
                              name='dateOfBirth'
                              label='Date of Birth'
                              placeholder='ex: YYYY-MM-DD'
                              />
                                <CustomInput 
                              control={form.control}
                              name='ssn'
                              label='SSN'
                              placeholder='ex: 1234'
                              />
                            </div>

                         
                          
                            </>
                          )}

                            <CustomInput 
                            control={form.control}
                            name='email'
                            label='Email'
                            placeholder='Enter your Email'
                            />

                            <CustomInput 
                            control={form.control}
                            name='password'
                            label='Password'
                            placeholder='Enter your Password'
                            />

                         <div className='flex-col flex gap-4'>
                            <Button className='form-btn'
                              disabled = {isLoading}//once is loading is active, diabled prevent to user from spamming the database with info
                              type="submit">
                                {isLoading ? (
                                  <>
                                    < Loader2 size={20}
                                      className="animate-spin"/> &nbsp;
                                    <span>Loading...</span>
                                  </>
                                ) : type === 'sign-in'
                                  ? 'Sign In'
                                  : 'Sign Up'
                              } 
                            </Button>
                         </div>
                           
                        </form>
            </Form>
            <footer className='flex justify-center gap-1'>

                    <p className='text-14 font-normal text-gray-600'> 
                      {type === 'sign-in' ? "Don't have an account?":
                      'Already Have an account?'} </p>
                      <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                      className='form-link'>
                        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                      </Link>
            </footer>
            </>
        )}
    </section>
  ) 
} 
export default AuthForm;