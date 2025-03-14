
import { useMutation } from "@tanstack/react-query";
import { FormDataType } from "@/components/types/zod-from";
import { SuccessResponse } from "@/server/types/success.types";
import { ErrorResponse } from "@/server/types/errors.types";
import { client } from "@/server/rpc/api.client";

export const SignInMutation = () => {
  const { mutateAsync, isPending, data: Res } = useMutation({
    mutationKey: ["signuin"],
    mutationFn: async (FormData: FormDataType) => {
      try {
        const res = await client.Auth.SignIn.$post(FormData);
        if (res.ok) {
          const info = await res.json() as SuccessResponse;
          return info;
        }
        const info = await res.json() as unknown as ErrorResponse;
        return info;
      } catch (error) {
        return {
          isSuccess: false,
          Message: String(error)
        } as ErrorResponse;
      }
    }
  })

  return { mutateAsync, isPending, Res }

}
