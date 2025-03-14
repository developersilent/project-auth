import type { Metadata } from "next"
import { Providers } from "@/server/rpc/client.provider"
import "@/styles/globals.css"
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster className="rounded-xl select-none" />
      </body>
    </html>
  )
}





















