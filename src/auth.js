import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { comparePassword } from './utils/passwordUtils';
import User from './models/userModel';

export const authOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        try {
          await mongoose.connect(process.env.DB_URL);
        } catch (error) {
          throw new Error('Could not connect to the database.');
        }

        const user = await User.findOne({ email: credentials.email }).select(
          '+isValidated password email name'
        );

        if (!user) {
          throw new Error('Incorrect credetials.');
        }

        if (!user.isValidated) {
          throw new Error('Email address is not validated.');
        }

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect credentials.');
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });

      // console.log(user);
      if (session) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.title = user.title;
        session.user.googleId = user.googleId || '';
        session.user.notificationsEnabled = user.notificationsEnabled;
      }

      return session;
    },
    async signIn({ account, profile, credentials, user }) {
      // console.log(account, profile, credentials, user);
      try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB connected');
      } catch (error) {
        throw new Error('Could not connect to the database.');
      }

      if (account.provider === 'google') {
        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          try {
            await User.create({
              name: user.name,
              email: user.email,
              isValidated: true,
              googleId: user.id,
            });
            return true;
          } catch (error) {
            throw new Error('Could not create account.');
          }
        } else {
          return true;
        }
      } else if (account.provider === 'credentials') {
        const isValid = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect credentials.');
        } else {
          return true;
        }
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
