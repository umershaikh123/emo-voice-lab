import React, { useState, useRef, useEffect, useCallback } from "react"
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
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import { callElevenLabsTextToSpeechAPI } from "@/utils/SpeechApi"
import { RingLoader, BeatLoader } from "react-spinners"
import { theme } from "@/theme/theme"
import anime from "animejs"

const AudioPlayer: React.FC<{ text: string }> = ({ text }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0.0)
  const [loading, setLoading] = useState(true) // Add the loading state
  const [duration, setDuration] = useState(0.0)
  const [loaded, setLoaded] = useState(false) // Add the loaded state
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const Reveal = ref.current

    if (Reveal && loaded) {
      // Animation using anime.js, only when loaded
      anime({
        targets: Reveal,

        opacity: [0, 1],
        duration: 1200,
        easing: "easeOutSine",
      })
    }
  }, [loaded])

  useEffect(() => {
    // Update the loaded state when audioUrl is not null
    if (audioUrl) {
      setLoaded(true)
    }
  }, [audioUrl])

  useEffect(() => {
    // Fetch audio URL when the component mounts
    const fetchAudioUrl = async () => {
      try {
        const url = await callElevenLabsTextToSpeechAPI(text) // Replace with your API call
        setAudioUrl(url || null)
      } catch (error) {
        console.error("Error fetching audio URL:", error)
      } finally {
        setLoading(false) // Once the API call is completed (success or error), set loading to false
      }
    }
    fetchAudioUrl()
  }, [])

  const handlePlayPause = useCallback(() => {
    const audioElement = audioRef.current
    if (audioElement?.paused) {
      audioElement?.play()
    } else {
      audioElement?.pause()
    }
    setPlaying(!isPlaying)
  }, [isPlaying])

  const handleSliderChange = useCallback(
    (_event: Event, value: number | number[]) => {
      const newValue = value as number
      setCurrentTime(newValue)
      if (audioRef.current) {
        audioRef.current.currentTime = newValue
      }
    },
    []
  )

  useEffect(() => {
    const audioElement = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement?.currentTime || 0.0)
    }

    const handleLoadedMetadata = () => {
      setDuration(audioElement?.duration || 0.0)
      console.log(audioElement?.duration)
    }

    const handleEnded = () => {
      setPlaying(false)
      setCurrentTime(0)
    }

    audioElement?.addEventListener("timeupdate", handleTimeUpdate)
    audioElement?.addEventListener("loadedmetadata", handleLoadedMetadata)
    audioElement?.addEventListener("ended", handleEnded)
    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate)
      audioElement?.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audioElement?.removeEventListener("ended", handleEnded)
    }
  }, [audioUrl])

  if (loading) {
    // Render the spinner while loading
    return (
      <div>
        <BeatLoader
          color={theme.palette.primary.main}
          size={10}
          loading={loading}
        />
      </div>
    )
  }

  //   const audioRef = useRef<HTMLAudioElement>(null)
  //   const [audioUrl, setAudioUrl] = useState<string | null>(null)
  //   const [isPlaying, setPlaying] = useState(false)
  //   const [currentTime, setCurrentTime] = useState(0)
  //   const [duration, setDuration] = useState(0)

  //   useEffect(() => {
  //     // Fetch audio URL when the component mounts
  //     const fetchAudioUrl = async () => {
  //       const url = await callElevenLabsTextToSpeechAPI(text) // Replace with your API call
  //       setAudioUrl(url || null)
  //     }
  //     fetchAudioUrl()
  //   }, [])

  //   useEffect(() => {
  //     const audioElement = audioRef.current

  //     const handleTimeUpdate = () => {
  //       setCurrentTime(audioElement?.currentTime || 0)
  //     }

  //     const handleLoadedMetadata = () => {
  //       setDuration(audioElement?.duration || 0)
  //     }

  //     audioElement?.addEventListener("timeupdate", handleTimeUpdate)
  //     audioElement?.addEventListener("loadedmetadata", handleLoadedMetadata)

  //     return () => {
  //       audioElement?.removeEventListener("timeupdate", handleTimeUpdate)
  //       audioElement?.removeEventListener("loadedmetadata", handleLoadedMetadata)
  //     }
  //   }, [])

  //   const handlePlayPause = useCallback(() => {
  //     const audioElement = audioRef.current
  //     if (audioElement?.paused) {
  //       audioElement?.play()
  //     } else {
  //       audioElement?.pause()
  //     }
  //     setPlaying(!isPlaying)
  //   }, [isPlaying])

  //   const handleSliderChange = useCallback(
  //     (_event: Event, value: number | number[]) => {
  //       const newValue = value as number
  //       setCurrentTime(newValue)
  //       audioRef.current!.currentTime = newValue
  //     },
  //     []
  //   )

  //   // Smoothly update the slider position based on the audio's current time
  //   useEffect(() => {
  //     if (isPlaying) {
  //       const audioElement = audioRef.current
  //       const updateTime = () => {
  //         setCurrentTime(audioElement?.currentTime || 0)
  //         requestAnimationFrame(updateTime)
  //       }
  //       requestAnimationFrame(updateTime)
  //     }
  //   }, [isPlaying])

  //   function formatTime(timeInSeconds: number): string {
  //     const hours = Math.floor(timeInSeconds / 3600)
  //     const minutes = Math.floor((timeInSeconds % 3600) / 60)
  //     const seconds = Math.floor(timeInSeconds % 60)

  //     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
  //       2,
  //       "0"
  //     )}:${String(seconds).padStart(2, "0")}`
  //   }

  function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = (timeInSeconds % 60).toFixed(2)

    return `${String(minutes)}:${seconds.padStart(4, "0")}`
  }

  console.log("duration", duration)
  console.log("currentTime", currentTime)

  return (
    <div ref={ref}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ ml: 0, pr: 5 }}
          alignItems="center"
        >
          <audio
            ref={audioRef}
            src={audioUrl || undefined}
            onEnded={() => setPlaying(false)}
          />
          {isPlaying ? (
            <PauseIcon fontSize="large" onClick={handlePlayPause} />
          ) : (
            <PlayArrowIcon fontSize="large" onClick={handlePlayPause} />
          )}

          <Slider
            value={currentTime}
            onChange={handleSliderChange}
            aria-labelledby="continuous-slider"
            min={0}
            max={duration}
          />
          {audioUrl && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          )}
        </Stack>
      </Box>
    </div>
  )
}

export default AudioPlayer
