"use server";

import { LoginProps, LoginSchema, RegisterProps, RegisterSchema } from "@/schemas";

// import { signIn, signOut } from "@/auth";
// import { SignInProps } from "@/zod/auth.zod";

// import { AuthError } from "next-auth";

export async function handleCredentialsSignIn(values: LoginProps) {
  //   const { email, password } = props;

  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }
  return {
    success: "Email Sent!"
  }
  //   try {
  //     await signIn("credentials", { usernameOrEmail, password, redirectTo: "/" });
  //   } catch (error) {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return {
  //             message: "Invalid credentials",
  //           };
  //         default:
  //           return {
  //             message: "Something went wrong.",
  //           };
  //       }
  //     }
  //     throw error;
  //   }
}

// export async function handleSignOut() {
//   await signOut();
// }
export async function handleRegister(values: RegisterProps) {
  //   const { email, password } = props;
  console.log("these are values ", values)

  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }
  return {
    success: "Email Sent!"
  }
}
// export async function handleForgetPassword(values: ForgetProps) {
//   //   const { email, password } = props;
//   console.log("these are values ", values)

//   const validateFields = ForgetSchema.safeParse(values);
//   if (!validateFields.success) {
//     return { error: "Invalid fields!" }
//   }
//   return {
//     success: "Email Sent!"
//   }
// }