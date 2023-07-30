import requests

# Replace the following with the path to your audio file
audio_file_path = "path/to/your/audio/file.mp3"

# Send a POST request to the API endpoint
url = "http://127.0.0.1:5000/process_audio"
files = {"audio": open(audio_file_path, "rb")}
response = requests.post(url, files=files)

# Check the response
if response.status_code == 200:
    data = response.json()
    print("Transcription:", data["transcription"])
    print("Detected Emotion:", data["emotion"])
    print("Generated Speech File:", data["speech_file"])
else:
    print("Error:", response.text)
