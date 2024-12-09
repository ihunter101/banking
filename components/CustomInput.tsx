import React from 'react'
import {
    FormField,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

//set authFormSchema into a function that accepts 
//a type equal to sign-up to the correct user field 
//based on the type sign up
const formSchema = authFormSchema('sign-up')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    label: string,
    placeholder: string
}

/**
 * A component that renders a single form field with a label, an input box, and
 * an error message if the input is invalid. 
 * 
 * It accepts four props: control, name, label, and placeholder. Control is a
 * react-hook-form control object, name is the name of the form field, label is
 * the text to be displayed as the label for the field, and placeholder is the
 * text to be displayed as the placeholder in the input box.
 * 
 * The component renders a single <FormField> with a single <FormControl> and
 * a single <FormMessage>. The <FormControl> contains an <Input> component
 * with the given placeholder and if the name is 'password', the type is set to
 * 'password', otherwise it is set to 'text'. The <FormMessage> is displayed
 * below the <FormControl> with a margin top of 2.
 * 
 * If the input is invalid, the <FormMessage> will display the error message.
 * 
 * @param {Control<z.infer<typeof formSchema>>} control - react-hook-form control object
 * @param {FieldPath<z.infer<typeof formSchema>>} name - name of the form field
 * @param {string} label - text to be displayed as the label for the field
 * @param {string} placeholder - text to be displayed as the placeholder in the input box
 * @returns a JSX element that renders a single form field with a label, an input box, and an error message if the input is invalid
 */

const CustomInput = ( {control, name, label, placeholder}: CustomInput ) => {
  return (
            <FormField // with a single form field 
                control={control}//with a single control
                name={name} //name of the field
                render={({ field }) => ( // and we render a single form item 
                    <div className='form-item'>
                        <FormLabel className='form-label'>
                        {label}
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                            placeholder={placeholder}
                            className='input-class'
                            type={name === 'password' ? 'password' : 'text'}
                            {...field} 
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2'/>
                        </div>
                    </div>
                )}
                />
)
}

export default CustomInput;