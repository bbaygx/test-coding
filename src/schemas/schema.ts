import * as z from "zod";

export const signInSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  }),
});

export const signUpSchema = z.object({
  email: z.string().email({
    message: "field must contain email ",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
