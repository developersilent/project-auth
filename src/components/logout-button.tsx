"use client";
import { SignOutMutation } from "@/queary-func/logout-query";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ErrorToast, SuccessToast } from "./toast";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const { mutateAsync, isPending } = SignOutMutation();
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const res = await mutateAsync();
      if (res.isSuccess) {
        SuccessToast(res.Message);
        router.push("/signin");
      } else {
        ErrorToast(res.Message);
      }
    }}>
      <Button disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
      </Button>
    </form>
  )
}
