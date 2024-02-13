import React, { useState, useEffect } from 'react';
import toWav from 'audiobuffer-to-wav';

function AudioRecorder({setAudioData}) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    setRecording(true);
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorder.stop();
  };

  useEffect(() => {
    // Request permissions for audio
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);

        newMediaRecorder.ondataavailable = e => {
          // Convert the Blob to an ArrayBuffer
          const reader = new FileReader();
          reader.onloadend = () => {
            // Convert the audio data to WAV format
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.decodeAudioData(reader.result)
              .then(audioBuffer => {
                const wav = toWav(audioBuffer);
                setAudioData(wav);
              });
          };
          reader.readAsArrayBuffer(e.data);
        };
      });
  }, []);

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
}

export default AudioRecorder;