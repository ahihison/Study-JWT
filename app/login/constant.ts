import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

formSchema.shape.password = formSchema.shape.password.min(1, {
  message: "password is required",
});
