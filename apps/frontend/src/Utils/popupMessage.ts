import { AxiosError, AxiosResponse } from "axios";
import { SIGNUP_ENDPOINT } from "@repo/utils/endpoints";
import {toast} from "../hooks/useToast.ts";

export const handleSuccessPopupMessage = (response: AxiosResponse) => {
  let message = "";

  switch (response.config.url) {
    case SIGNUP_ENDPOINT:
      message = "Please login. User successfully registered.";
      break;
  }

  if (message) {
    toast({
      title:"success"
    })
  }
};

export const handleErrorPopupMessage = (error: AxiosError) => {
  const errorCode = error.response?.status || "Unknown";
  const errorMessage =
    (error.response?.data as { message: string })?.message ||
    "An error occurred.";
  const fullMessage = `${errorCode}: ${errorMessage}`;
  toast({
    title: "Error",
    description: fullMessage,
    variant: "error"
  })
};
