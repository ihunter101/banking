'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {

    try {
        
    } catch (error) {
        
    }
}
/**
 * Registers a new user account using the provided sign-up parameters.
 *
 * This function takes in user data, including email, password, first name, 
 * and last name, and creates a new user account with these details. It then 
 * establishes a session for the user using their email and password. Upon 
 * successful registration and session creation, a custom session cookie is set 
 * for the user with secure attributes.
 *
 * @param {SignUpParams} userData - The user's sign-up information, including 
 * email, password, first name, and last name.
 */
export const signUp = async (userData : SignUpParams) => {

    const { email, password, firstName, lastName } = userData; //we destructute the email password and names from userdata so that we have access to them wne we define them in the account.creat()
    try {
        const { account } = await createAdminClient();

           const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password,
            `${firstName} ${lastName}`);//optional name will be accepted 
           
             const session = await account.createEmailPasswordSession(email, password);

            (await cookies()).set("appwrite-session", session.secret, { //ref to the appwrite session in appwrite.ts
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
            return parseStringify(newUserAccount);//parseStringify is a ref to the utils.ts
    } catch (error) {
        console.log('Error' + error);
    }
};

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  };

  
  
  