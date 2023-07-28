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
  { id: "1", role: "user", content: "hey" },
  { id: "2", role: "assistant", content: "Hello! How can I assist you today?" },
  { id: "3", role: "user", content: "just testing my new application" },
  { id: "2", role: "assistant", content: "Hello! How can I assist you today?" },
  { id: "3", role: "user", content: "just testing my new application" },
  { id: "2", role: "assistant", content: "Hello! How can I assist you today?" },
  { id: "3", role: "user", content: "just testing my new application" },
]

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
                        {m.content}
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
