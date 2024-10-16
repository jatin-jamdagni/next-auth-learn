import NextAuth, {  NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { Role } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {

  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) { 
        session.user.role = token.role as Role
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      try {
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          token.role = existingUser.role;
        }
      } catch (error) {
        console.error("Error fetching user for JWT:", error);
      }

      return token;
    },
  },
  
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

















// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials): Promise<User | null> => {
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
