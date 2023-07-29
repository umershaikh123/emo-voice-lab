const dotenv = require("dotenv")
dotenv.config()

const callElevenLabsTextToSpeechAPI = async (text: string) => {
  if (!text) return "Text parameter can't be null"

  const [rachel, anntoni] = ["21m00Tcm4TlvDq8ikWAM", "ErXwobaYiN019PkySvjV"]

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${rachel}`

  const apiKey = process.env.ELEVENLABS_API_KEY || "undefined"
  console.log("api Key", apiKey)

  const headers = {
    accept: "audio/mpeg",
    "xi-api-key": apiKey,
    "Content-Type": "application/json",
  }

  const data = {
    text,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("API request failed")
    }

    const blob = await response.blob()
    const audioUrl = URL.createObjectURL(blob)

    return audioUrl
  } catch (error) {
    console.error("Error:", error) // Handle any errors
  }
}

export { callElevenLabsTextToSpeechAPI }
