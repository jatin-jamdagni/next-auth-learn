"use server";

import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { sendVerificatioinMail } from "@/lib/mail";
import { genrateVerificationToken } from "@/lib/tokens";
import { RegisterProps, RegisterSchema } from "@/schemas";
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

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  const vertificationToken = await genrateVerificationToken(email);
  await sendVerificatioinMail({
    email: vertificationToken.email,
    token: vertificationToken.token,
  });
   return {
    success: "Confirmation email sent!",
  };
}
