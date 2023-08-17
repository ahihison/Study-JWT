import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(1, {
    message: "User name is required",
  }),
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
// Custom validation for password length less than 3
formSchema.shape.username = formSchema.shape.username.min(3, {
  message: "username must be at least 3 characters long",
});
formSchema.shape.email = formSchema.shape.username.min(1, {
  message: "email is required",
});
formSchema.shape.password = formSchema.shape.password.min(6, {
  message: "Password must be at least 6 characters",
});
