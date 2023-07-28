"use client"

import { useChat } from "ai/react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return <div className="">Page</div>
}
