import { Button } from "@/components/ui/button";
import GoogleIcon from "./custom-icons/google-icon";

export function GoogleLogin() {
  return (
    <form>
      <Button className="w-full rounded-xl cursor-not-allowed" variant={"outline"} size={"default"} disabled>
        <GoogleIcon />
        <span className="text-xs">Countinue with Google</span>
      </Button>
    </form>
  )
}
