import { z } from "zod";

export const signUpValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum legngth of password should be 3" })
    .max(50, { message: "Maximum legngth of password should be 50" }),
  number: z
    .string()
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});

export const loginValidationSchema = z.object({
  number: z
    .string()
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});

export const createPostValidationSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 characters long" })
    .max(280, { message: "Content must not exceed 280 characters" }),
  postType: z
    .enum(["recommend", "ask", "update", "event"], {
      errorMap: () => ({ message: "Select one of badge" }),
    }),
  image: z
    .any()
    .refine((files: FileList) => files && files.length > 0, {
      message: "Image is required",
    }),
  lat: z
    .number()
    .min(-90, { message: "Latitude must be greater than or equal to -90" })
    .max(90, { message: "Latitude must be less than or equal to 90" }),
  lng: z
    .number()
    .min(-180, { message: "Longitude must be greater than or equal to -180" })
    .max(180, { message: "Longitude must be less than or equal to 180" }),
});