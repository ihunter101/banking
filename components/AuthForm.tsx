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

const formSchema = z.object({ //zod is a form validation library that allows us to choose what fields we want in our form schema and how we validate those fields
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

const AuthForm = ({ type } : { type:string }) => {

    const [user, setUser] = useState(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5  md:gap-8'>
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
                ? 'sign in' 
                :'sign up'
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
                    <Form {...form}>//form hook from react hook is passes to the Form component from shadcn 
                        <form onSubmit={Form.handleSubmit(onsubmit)} className="space-y-8">//the form hook is used as a wrapper for an html form  which has an onsubnit handle
                            <FormField // with a single form field 
                            control={Form.control}//with a single control
                            name="username" //name of the field
                            render={({ field }) => (// and we render a single form item 
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
            </Form>
            </>
        )}
    </section>
  )
}


export default AuthForm