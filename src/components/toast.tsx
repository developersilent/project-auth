import { Check, X } from "lucide-react"
import { toast } from "sonner"


export const SuccessToast = (msg: string) => {
  return (
    toast.custom((id) => (
      <div className="flex items-center gap-3 rounded-xl bg-muted py-1.5 px-4 outline-1 outline-green-50 shadow-lg w-fit" key={id}>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
          <Check className="h-4 w-4 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-muted-foreground font-semibold">{msg}</p>
        </div>
      </div>
    ), {
      position: "top-right"
    })
  )
}



export const ErrorToast = (msg: string) => {
  return (
    toast.custom((id) => (
      <div className="flex items-center gap-3 rounded-xl bg-muted py-1.5 px-4 outline-1 outline-red-50 shadow-lg w-fit" key={id}>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
          <X className="h-4 w-4 text-red-500" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-muted-foreground font-semibold">{msg.split(":")[1]?.trim()}</p>
        </div>
      </div>
    ), {
      position: "top-right"
    })
  )
}








