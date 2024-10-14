// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { signInSchema } from "./zod/auth.zod";
 
// type User = {
//   id: number;
//   name: string;
//   email: string;
//    role?: string;
// };
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize : async (credentials): Promise<User | null> =>{
//         let user: User | null = null;

//         const parsedCredentials = signInSchema.safeParse(credentials);

//         if (!parsedCredentials.success) {
//           console.log("Invalid credentials:", parsedCredentials.error.errors);
//           return null;
//         }

//         user = {
//           id: 1,
//           name: "jatin",
//           email: "mail@example.com",
//           //   isAdmin: true
//         };

//         if (!user) {
//           return null;
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ request: { nextUrl }, auth }) {
//       const isLoggedIn: boolean = !!auth?.user;

//       const { pathname } = nextUrl;
//       if (pathname.startsWith("/sign-in") && isLoggedIn) {
//         return Response.redirect(new URL("/", nextUrl));
//       }

//       return !!auth;
//     },
//     jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id as string;
//         token.role = user.role;
//       }
//       if (trigger === "update" && session) {
//         token = { ...token, ...session };
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/sign-in",
//   },
// });
