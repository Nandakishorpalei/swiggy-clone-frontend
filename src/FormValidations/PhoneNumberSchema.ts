import { ConfirmationResult } from "firebase/auth";
import { object, string } from "yup";

export const phoneNumberSchema = (user: ConfirmationResult | null) =>
  object({
    phone: string()
      .min(1)
      .required("Phone number is required")
      .test("phone", "Invalid phone number", (value) => value?.length === 10),
  });
