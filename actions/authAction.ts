// "use server";
// import { signIn, signOut } from "@/auth";
// import { SignInProps } from "@/zod/auth.zod";
 
// import { AuthError } from "next-auth";

// export async function handleCredentialsSignIn(props: SignInProps) {
//   const { usernameOrEmail, password } = props;

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
// }

// export async function handleSignOut() {
//   await signOut();
// }
