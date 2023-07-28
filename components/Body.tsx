import React from "react"
import SendIcon from "@mui/icons-material/Send"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  makeStyles,
  Tooltip,
  TextField,
  Stack,
  Slider,
  Modal,
} from "@mui/material"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import { Children, useEffect } from "react"

import { useCompletion, useChat } from "ai/react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

import InputAdornment from "@mui/material/InputAdornment"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { styled } from "@mui/material/styles"

import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"

const mainPrimary = theme.palette.primary.main
const darkGreen = theme.palette.border.main

const CssTextField = styled(TextField)({
  transition: "all 0.3s ease-in-out",
  backgroundColor: theme.palette.secondary.main,

  "& label": { color: theme.palette.border.main },
  "& helperText": { color: theme.palette.primary.main },
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
    height: "3rem",
  },

  "& label.Mui-focused": {
    transition: "all 0.3s ease-in-out",
    color: mainPrimary,
  },
  "& .MuiInput-underline:after": {
    transition: "all 0.3s ease-in-out",
    borderBottomColor: mainPrimary,
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      transition: "all 0.3s ease-in-out",
      borderColor: mainPrimary,
    },
    "&:hover fieldset": {
      transition: "all 0.3s ease-in-out",
      borderColor: darkGreen,
    },
    "&.Mui-focused fieldset": {
      transition: "all 0.3s ease-in-out",
      borderColor: darkGreen,
    },
  },
})

interface Message {
  id: string
  role: "function" | "user" | "assistant" | "system"
  content: string
}

const Messages: Message[] = [
  { id: "1", role: "assistant", content: "Type a sentence to get started" },
  { id: "2", role: "user", content: "prompt" },
  { id: "3", role: "assistant", content: "Hello! How can I assist you today?" },
]

export default function ContinuousSlider() {
  const [value, setValue] = React.useState<number>(0)
  const [paused, setPaused] = React.useState(false)
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Stack
          spacing={3}
          direction="row"
          sx={{ ml: 2, pr: 5 }}
          alignItems="center"
        >
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowIcon
                sx={{ fontSize: "3rem", width: 35, height: 35 }}
                htmlColor={theme.palette.primary.main}
              />
            ) : (
              <PauseIcon
                sx={{ fontSize: "3rem", width: 35, height: 35 }}
                htmlColor={theme.palette.primary.main}
              />
            )}
          </IconButton>
          {/* <PlayArrowIcon sx={{ width: 35, height: 35 }} /> */}

          <Slider aria-label="Volume" value={value} onChange={handleChange} />
        </Stack>
      </Box>
    </ThemeProvider>
  )
}
export const Body = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat()
  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      handleButtonSubmit(event)
    }
  }

  const handleButtonSubmit = async (event: any) => {
    event.preventDefault()
    handleSubmit(event)

    setMessages(Messages)
  }

  return (
    <div>
      <Box sx={{ px: 2, py: 2 }}>
        <Stack
          direction="column"
          alignItems="start"
          justifyContent="space-between"
          spacing={0}
          sx={{
            py: 2,
            maxHeight: "70vh",
            minHeight: "70vh",
            height: "100%",

            overflow: "auto",
          }}
        >
          {/* conversation */}
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="start"
            spacing={3}
            sx={{
              overflow: "auto",

              width: "100%",
              maxWidth: "100%",
            }}
          >
            {messages.map(m => (
              <div key={m.id} className=" justify-start bg-[#1A0B11]  w-full ">
                {m.role === "user" ? (
                  <div className="  ">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        py: 1.5,
                        backgroundColor: theme.palette.chatBackground.main,
                        px: 2,
                      }}
                    >
                      <div className=" ">
                        {/* <Avatar
                          alt="Remy Sharp"
                          src={"/Images/Customer.svg"}
                          //   src={user?.picture || '/Images/Customer.svg'}
                          sx={{ width: 40, height: 40 }}
                        /> */}
                        <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-regular ">
                        {m.content}
                      </div>
                    </Stack>
                  </div>
                ) : (
                  <div className="  ">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        px: 2,
                        py: 1.5,

                        backgroundColor: theme.palette.chatBackground.main,
                      }}
                    >
                      <div className=" ">
                        <Avatar
                          alt="Remy Sharp"
                          src={"/Images/gptIcon.svg"}
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-medium">
                        {/* {m.content} */}
                        <ContinuousSlider />
                      </div>
                    </Stack>
                  </div>
                )}
              </div>
            ))}
          </Stack>

          {/* end two buttons  */}
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{
              mt: 4,

              width: "100%",
              maxWidth: "100%",
            }}
          >
            <form onSubmit={handleButtonSubmit} className="  w-full">
              <CssTextField
                label="Prompt"
                maxRows={10}
                fullWidth
                id="fullWidth"
                multiline
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                // sx={{ width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <Button type="submit">
                        <SendIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

const callElevenLabsTextToSpeechAPI = async (text: string) => {
  if (!text) return "Text parameter can't be null"

  const [rachel, anntoni] = ["21m00Tcm4TlvDq8ikWAM", "ErXwobaYiN019PkySvjV"]

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${rachel}`

  const apiKey = process.env.ELEVENLABS_API_KEY

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
