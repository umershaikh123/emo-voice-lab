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
  TextField,
  FormControl,
  FormHelperText,
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

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"

import Select, { SelectChangeEvent } from "@mui/material/Select"

import { styled } from "@mui/material"
import { Theme, useTheme } from "@mui/material/styles"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
      background: "#1E004A",
      color: theme.palette.primary.main,
    },
  },
}

export function BasicSelect() {
  const [age, setAge] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <Box
      component="form"
      sx={{
        width: "20ch",
        "& .MuiTextField-root": {
          color: theme.palette.primary.main,
        },
        ".MuiSelect-icon": {
          color: theme.palette.primary.main,
        },

        "& label": {
          color: theme.palette.primary.main,
        },

        "& .MuiInputBase-input": {
          color: theme.palette.primary.main,
        },

        "& label.Mui-focused": {
          transition: "all 0.3s ease-in-out",
        },
        "& .MuiInput-underline:after": {
          transition: "all 0.3s ease-in-out",
          borderBottomColor: theme.palette.border.main,
        },

        "& fieldset": {
          transition: "all 0.3s ease-in-out",
          borderColor: theme.palette.border.main,
        },
      }}
    >
      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">Voice</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="outlined"
          color="primary"
          value={age}
          label="Age"
          MenuProps={MenuProps}
          onChange={handleChange}
        >
          <MenuItem value={10}>Bella</MenuItem>
          <MenuItem value={20}>Adam</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
          <MenuItem value={30}>Antoni</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export const Settings = () => {
  const [age, setAge] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

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
            {/* <Button
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
            </Button> */}

            {/* <SelectTextFields /> */}
            <BasicSelect />
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<TuneIcon />}
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                minWidth: "25ch",
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
                minWidth: "25ch",
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
