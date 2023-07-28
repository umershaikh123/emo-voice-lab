import React from "react"
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
  Stack,
} from "@mui/material"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import SettingsIcon from "@mui/icons-material/Settings"
import TuneIcon from "@mui/icons-material/Tune"

export const Settings = () => {
  return (
    <div className="w-full">
      <ThemeProvider theme={theme}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          sx={{ border: "" }}
        >
          <div>
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              Settings
            </Typography>
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<ArrowDropDownIcon />}
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                minWidth: "10rem",
              }}
            >
              character Voice
            </Button>
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<TuneIcon />}
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                minWidth: "10rem",
              }}
            >
              Voice Settings
            </Button>
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SettingsIcon />}
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                minWidth: "10rem",
              }}
            >
              Model
            </Button>
          </div>
        </Stack>
      </ThemeProvider>
    </div>
  )
}
