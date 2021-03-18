import { toast as toastifyToast, ToastContent } from "react-toastify";

export const toast = (content: ToastContent) =>
  toastifyToast(content, {
    position: "top-center",
  });
