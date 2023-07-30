import { Navbar } from "@/components/Navbar"
import "./globals.css"
import { Inter } from "next/font/google"
import { ApiProvider } from "@/hooks/ApiContext"
import { config } from "dotenv"
config()
// This loads the environment variables from .env.local into process.env

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
  // console.log("Api Key", process.env.ELEVENLABS_API_KEY)
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" container mx-auto mt-5">
          <ApiProvider>{children}</ApiProvider>
        </div>
      </body>
    </html>
  )
}
