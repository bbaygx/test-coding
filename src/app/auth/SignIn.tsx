import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { signInUser } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { currentDate } from "@/lib/lib";
import { signInSchema } from "@/schemas/schema";

export default function SignIn() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isSuccess, data, isError, isPending } = useMutation({
    mutationFn: signInUser,
  });

  if (isError) {
    toast({
      title: `Username / password salah`,
      description: currentDate,
    });
  }

  if (isSuccess) {
    localStorage.setItem("token", data.data.token);

    if (localStorage.getItem("token")) {
      //
      toast({
        title: `Login berhasil`,
        description: currentDate,
      });
      navigate("/");
    }
  }

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);

    mutate(values);
  }

  return (
    <main className="flex justify-center h-screen items-center drop-shadow-lg shadow-md">
      <Card className="w-[400px] ">
        <CardHeader>
          <CardTitle className="text-2xl">Sign-in 🔑</CardTitle>
          <CardDescription>
            Welcome back! Please enter your email and password to sign in to
            your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6 flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending ? true : false}
                >
                  Submit
                </Button>
                <Link to="/auth/signup" className="inline-flex justify-center">
                  <Button variant="link" type="button">
                    Don't have an account?
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
