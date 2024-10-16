"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { genrateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  LoginProps,
  LoginSchema,
  
} from "@/schemas";
import { AuthError } from "next-auth";
 
export async function handleCredentialsSignIn(values: LoginProps) {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Email does not exists!"}
  }
  
  if(!existingUser.emailVerified){
    const genrateToken = await genrateVerificationToken(existingUser.email);

    return {
      success: "Confirmation email sent!"
    }
  }


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}