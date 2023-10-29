import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        if (req.method === "POST") {
          try {
            if (credentials.token) {
              return {
                ...credentials,
                jwt: credentials?.token,
              };
            }
            return null;
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    signIn: ({ user, account, profile }) => {
      return true;
    },

    async session({ session, user, token }) {
      if (token) {
        return {
          ...session,
          jwt: token.jwt,
        };
      }
      return session;
    },
    jwt({ token, user, account }: any) {
      if (user && user?.jwt) {
        return {
          ...token,
          jwt: user.jwt,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
