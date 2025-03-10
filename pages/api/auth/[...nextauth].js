import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const previewProviders = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      username: {
        label: "Username",
        type: "text",
        placeholder: "username",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // Simple hardcoded username/password check (for demo purposes)
      if (
        credentials.username === "fisch" &&
        credentials.password === "fisch"
      ) {
        return {
          name: "Neuer Fisch",
          email: "test@example.com",
          id: "a1b2c3d4",
        };
      } else {
        // Return null if login fails
        return null;
      }
    },
  }),
];

const productionProviders = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
        scope: "openid email profile",
      },
    },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
  }),

  GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),

  // ...add more providers here
];
console.log(process.env.VERCEL_ENV);

export const authOptions = {
  // Configure one or more authentication providers
  providers:
    process.env.VERCEL_ENV === "preview"
      ? previewProviders
      : productionProviders,

  //extension of the session object with the token / userId
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  url:
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
};

export default NextAuth(authOptions);
