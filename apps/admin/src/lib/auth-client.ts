import { createAuthClient } from "better-auth/react";
import {
  twoFactorClient,
  adminClient,
  multiSessionClient,
  //oneTapClient,
  oidcClient,
  genericOAuthClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

export const client = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }),
    adminClient(),
    multiSessionClient(),
    //     oneTapClient({
    //       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    //       promptOptions: {
    //         maxAttempts: 1,
    //       },
    //     }),
    oidcClient(),
    genericOAuthClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.khalifacrafted.store",
});

export const { signUp, signIn, signOut, useSession } = client;
