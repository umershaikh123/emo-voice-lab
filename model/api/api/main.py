pip install flask transformers torch torchaudio gtts pydub

import os
import torch
import torchaudio
from transformers import Wav2Vec2Tokenizer, Wav2Vec2ForCTC, RobertaTokenizer, RobertaForSequenceClassification
from flask import Flask, request, jsonify

app = Flask(__name__)

# Dictionary of emotion labels
emotion_labels = {
    0: "anger",
    1: "joy",
    2: "surprise",
    3: "sadness",
    4: "others",
    5: "fear",
    6: "disgust"
}

def convert_to_flac(audio_file):
    filename, file_extension = os.path.splitext(audio_file)
    if file_extension.lower() != ".flac":
        print("Converting to .flac...")
        flac_file = filename + ".flac"
        sound = pydub.AudioSegment.from_file(audio_file)
        sound.export(flac_file, format="flac")
        return flac_file
    return audio_file

def speech_to_text(audio_file, model_name):
    tokenizer = Wav2Vec2Tokenizer.from_pretrained(model_name)
    model = Wav2Vec2ForCTC.from_pretrained(model_name)
    waveform, sample_rate = torchaudio.load(audio_file)
    target_sample_rate = 16000  
    if sample_rate != target_sample_rate:
        resampler = torchaudio.transforms.Resample(sample_rate, target_sample_rate)
        waveform = resampler(waveform)

    inputs = tokenizer(waveform.squeeze().numpy(), return_tensors="pt", padding=True)
    with torch.no_grad():
        logits = model(**inputs).logits

    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = tokenizer.batch_decode(predicted_ids)[0]

    return transcription

def detect_emotion(text, emotion_model):
    if not text or not isinstance(text, str):
        raise ValueError("Input text should be a non-empty string.")

    tokenizer = RobertaTokenizer.from_pretrained(emotion_model)
    model = RobertaForSequenceClassification.from_pretrained(emotion_model)
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    logits = outputs.logits
    prediction = torch.argmax(logits, dim=1).item()
    emotion = emotion_labels[prediction]
    return emotion

def generate_speech(text, emotion):
    voice_options = {
        "anger": "com/en-us/stu/stu/",
        "joy": "com/en-us/stw/stw/",
        "surprise": "com/en-us/sts/sts/",
        "sadness": "com/en-us/sts/sts/",
        "others": "com/en-us/sts/sts/",
        "fear": "com/en-us/stf/stf/",
        "disgust": "com/en-us/std/std/"
    }

    if emotion in voice_options:
        voice = voice_options[emotion] + "default"
    else:
        voice = "com/en-us/sts/sts/default"

    tts = gTTS(text=text, lang='en', slow=True, tld='com', lang_check=False)
    filename = f"emotion_{emotion}.mp3"
    tts.save(filename)

    return filename

@app.route('/process_audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided.'}), 400

    audio_file = request.files['audio']
    audio_file_path = os.path.join('uploads', audio_file.filename)
    audio_file.save(audio_file_path)

    transcription = speech_to_text(audio_file_path, "facebook/wav2vec2-large-960h-lv60-self")
    print("--- Transcription ---")
    print(transcription)

    detected_emotion = detect_emotion(transcription, "finiteautomata/bertweet-base-emotion-analysis")
    print("Detected Emotion:", detected_emotion)

    speech_text = transcription  
    speech_file = generate_speech(speech_text, detected_emotion)
    print("Generated Speech File:", speech_file)

    return jsonify({'transcription': transcription, 'emotion': detected_emotion, 'speech_file': speech_file}), 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(host='0.0.0.0', port=5000)
