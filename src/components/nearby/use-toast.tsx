import { toast as shadcnToast } from "sonner";

// 타입 통일을 위해 래핑
export const useToast = () => {
  return {
    toast: shadcnToast,
    success: (msg: string) => shadcnToast.success(msg),
    error: (msg: string) => shadcnToast.error(msg),
    dismiss: shadcnToast.dismiss,
    custom: shadcnToast.custom,
  };
};
