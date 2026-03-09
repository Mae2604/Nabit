import { betterAuth } from "better-auth";
import { pool } from "./app/db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: pool,
  user: {
    additionalFields: {
      activeRole: {
        type: "string",
        defaultValue: null,
        required: false,
        input: true,
      },
      onboardingComplete: {
        type: "boolean",
        defaultValue: false,
        required: false,
        input: true,
      },
    },
  },
});