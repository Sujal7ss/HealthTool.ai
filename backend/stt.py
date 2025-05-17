import whisper
import sounddevice as sd
import numpy as np
import tempfile
import scipy.io.wavfile as wav
import socketio
model = whisper.load_model("base")

sio = socketio.Client()
sio.connect("http://localhost:3000")

def record_audio(duration=5, fs=16000):
    print("Recording...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    print("Done.")
    return fs, audio

def transcribe_audio():
    while True:
        fs, audio = record_audio(duration=5)
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
             wav.write(f.name, fs, audio)
             result = model.transcribe(f.name)
             resulttranslated = model.transcribe(f.name, task="translate")

             # Prepare message payload
             payload = {
                "original": result["text"],
                "translated": resulttranslated["text"]
            }

            # Emit message to frontend via socket
             sio.emit("transcription_result", payload)
             print("Translated:", resulttranslated["text"])
             print("You said:", result["text"])

transcribe_audio()
# __all__ = ['transcribe_audio']       
