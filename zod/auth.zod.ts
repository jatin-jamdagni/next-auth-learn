import { z } from "zod";

export const signInSchema = z.object({
    usernameOrEmail: z
      .string()
      .min(1, "Username or email is required")
      .refine((value) => {
         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
  
        return emailPattern.test(value) || usernamePattern.test(value);
      }, "Invalid username or email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
  export type SignInProps =z.infer<typeof signInSchema>