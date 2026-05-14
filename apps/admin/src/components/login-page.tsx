import { useLogin } from "ra-core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SignIn from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";

export const LoginPage = () => {
  const login = useLogin();

  return (
    <div className="flex h-screen">
      <div className="container relative grid flex-col items-center justify-center sm:max-w-none md:grid-cols-2 md:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r md:flex">
          <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover " />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/khalidLogo.png" className="w-32" alt="Khalifa Crafted" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Where craftsmanship meets care, every lather tells a
                story of quality, tradition, and luxury—crafted to elevate your
                everyday routine.&rdquo;
              </p>
              <footer className="text-sm">William - CEO</footer>
            </blockquote>
          </div>
        </div>
        <div className="md:p-8 flex justify-center items-center md:h-full md:overflow-y-auto">
          <div className="md:w-[400px]  md:mt-10 2xl:mt-0">
            <Tabs defaultValue="sign-in">
              <TabsList>
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up">sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in">
                <SignIn login={login} />
              </TabsContent>
              <TabsContent value="sign-up">
                <SignUp />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
