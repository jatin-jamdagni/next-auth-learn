
import * as z from "zod"


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(1, {
        message: "Password is required!"
    })
})

export type LoginProps = z.infer<typeof LoginSchema>


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required!"
    }),
    name: z.string().min(3, {
        message: "Name is required!"
    }),

    role: z.enum(["ADMIN", "USER", "SUPERADMIN"], {
        errorMap: () => ({ message: "Select a role!" })
    })
})

export type RegisterProps = z.infer<typeof RegisterSchema>



// export type UserRole = "ADMIN" | "USER" | "SUPERUSER";