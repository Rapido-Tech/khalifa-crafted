import { client } from "./lib/auth-client";
import { toast } from "sonner";

const { signIn, signOut } = client;

const authProvider = {
  // Login method: Call Better Auth's signIn
  async login({ email, password }: { email: string; password: string }) {
    const toastId = toast.loading("Logging in, please wait...");
    console.log("email:", email, "password:", password);
    try {
      const data = await signIn.email({ email, password });
      console.log(data);
      if (data.data !== null) {
        toast.success("Login successful!", { id: toastId });
        return {
          success: true,
          data,
        };
      } else {
        toast.error(`Login failed ${data.error.message} `, { id: toastId });
        throw new Error("Login failed");
      }
    } catch (error: any) {
      // Handle login error (e.g., invalid credentials)
      console.log(error);
      throw new Error("Login failed");
    }
  },

  // Check for errors: Handle different types of auth errors
  async checkError(error: any) {
    const status = error.status;
    console.log("checkError:", status);
    if (status === 401 || status === 403) {
      signOut();
      throw new Error("Session expired or unauthorized");
    }
    // Other error codes (404, 500, etc) can be handled here if needed
  },

  // Check if the user is authenticated (check session)
  async checkAuth() {
    const { data: session } = await client.getSession();
    console.log("checkAuth:", session);
    if (!session || !session.user) {
      throw new Error("Not authenticated");
    }
  },

  // Logout method: Call Better Auth's signOut
  async logout() {
    await signOut();
  },

  // Get the user's identity: Retrieve user info from the session
  async getIdentity() {
    const { data: session } = await client.getSession();
    console.log("getIdentity:", session);
    if (session && session.user) {
      return {
        id: session.user.id,
        fullName: session.user.name,
        email: session.user.email,
      };
    }
    return {
      id: "",
      fullName: "Guest",
      email: "",
    };
  },

  //   // Optional: Get user permissions (if applicable for authorization)
  //   async getPermissions() {
  //     const session = useSession();
  //     if (session && session.data?.user) {
  //       return session.data.user.role || [];
  //     }
  //     return [];
  //   },
};

export default authProvider;
