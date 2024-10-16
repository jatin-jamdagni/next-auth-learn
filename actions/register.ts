"use server";

 import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { genrateVerificationToken } from "@/lib/tokens";
 import {
  
  RegisterProps,
  RegisterSchema,
} from "@/schemas";
import bcrypt from "bcryptjs";
  
export async function handleRegister(values: RegisterProps) {
    const validateFields = RegisterSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalid fields!" };
    }
    const { email, name, password, role } = validateFields.data;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return { error: "Email already in use!" };
    }
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });


    const vertificationToken = await genrateVerificationToken(email);

  console.log(vertificationToken)
    //TODO:if Send verification email
  
    return {
      success: "Confirmation email sent!",
    };
  }
  