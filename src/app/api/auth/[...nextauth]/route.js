import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email + Password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || user.provider !== "credentials") {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          provider: user.provider,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          provider: account.provider,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();

      if (!session?.user?.email) return session;

      const dbUser = await User.findOne({
        email: session.user.email,
      });

      if (!dbUser) return session;

      session.user.id = dbUser._id.toString();
      session.user.provider = dbUser.provider;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
