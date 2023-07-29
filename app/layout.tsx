import { Navbar } from "@/components/Navbar"
import "./globals.css"
import { Inter } from "next/font/google"
import { ApiProvider } from "@/hooks/ApiContext"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EmoVoiceLabs",
  description: "next 13 || Typescript || Ai || EmoVoiceLabs ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" container mx-auto mt-5">
          <Navbar />
          <ApiProvider>{children}</ApiProvider>
        </div>
      </body>
    </html>
  )
}
