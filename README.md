# EmoVoiceLabs

Welcome to EmoVoiceLabs, the revolutionary text-to-speech application that adds emotions to your conversations! 🚀

## Problem Statement

Current text-to-speech (TTS) technology lacks emotional expression, resulting in flat and unengaging interactions. EmoVoiceLabs aims to bridge this gap by infusing personalized emotional voice generation into every word.

## Our Solution

EmoVoiceLabs utilizes advanced AI technology, employing cutting-edge machine learning algorithms to analyze input text and generate appropriate emotional expressions. The result? A more natural and human-like speaking style that enhances user experiences.

## How it Works
Please note that currently, the model has not been integrated into the frontend. Everything is run locally on the server.

1. **Input Prompt**: Start with a prompt or text as input.
2. **Speech-to-Text Transcription**: Preprocess the audio file and perform Speech to Text Transcription using Facebook's Wav2Vec2 model.
3. **Sentiment Analysis**: Our powerful sentiment analysis engine identifies emotions from the text.
4. **Emotion-Infused Audio**: Based on the sentiment analysis results, we employ Google's Text-to-Speech model to generate emotive audio.


## Business Value

Unlock the potential of emotions in customer interactions with EmoVoiceLabs:

- Enhanced Customer Engagement
- Increased Conversion Rates
- Improved Customer Retention


## Market Opportunity

EmoVoiceLabs taps into a multi-billion dollar market opportunity, with limited competition and a growing need for emotional intelligence in customer interactions.

## Future Plans

We are committed to empowering businesses with the EmoVoiceLabs API, expanding our emotional vocabulary, and continually improving our model results.


## Run locally
To run the Next.js frontend for EmoVoiceLabs, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org) installed on your system.

2. Clone the repository:

```sh
git clone https://github.com/umershaikh123/emo-voice-lab.git
cd emo-voice-lab
npm install
npm run dev
```
3.Model running

```
cd emo-voice-lab\model\api\api
venv\Scripts\activate //Activate the virtual environment on Windows
pip install -r requirements.txt
python main.py
```


## Technologies Used

EmoVoiceLabs is built on a robust tech stack that leverages the following cutting-edge technologies:

- Next.js: A powerful React framework for building server-side rendered (SSR) and statically generated (SSG) web applications.

- Material-UI: A popular React UI framework that provides a set of customizable and beautifully designed components.

- TensorFlow: An open-source machine learning platform, powering our advanced AI technology for sentiment analysis.

- Wav2Vec2: Facebook's state-of-the-art model for speech-to-text transcription.

- Google Text-to-Speech: Google's API that converts text into natural-sounding speech, enabling emotion-infused audio generation.

- Eleven Labs: The text-to-speech technology serving as the foundation for EmoVoiceLabs.



## Meet the Team

Meet the passionate and dedicated team behind EmoVoiceLabs, with expertise in AI and software development:

- Fashad Ahmed: AI Engineer, Full Stack Developer, AI Enthusiast (Undergraduate at NEDUET)
- Muhammad Umer: Full Stack Developer, Blockchain Dev, AI Enthusiast (Undergraduate at University of Karachi, Department of UBIT)

## License

This project is licensed under the [MIT License](LICENSE).
