import Image from 'next/image'
import { Inter } from 'next/font/google'
import Editor from "../components/DanteEditor"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="">
        <Editor />
      </div>
    </main>
  )
}
