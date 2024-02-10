// Import necessary modules and components
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import AudioControl from "./components/AudioControl";
import { useState } from "react";

// Define the App component
function App() {
    // Initialize state variables for playAudio, script, and audioTime
    // playAudio is a boolean indicating whether the audio is playing
    // script is a string indicating the current script
    // audioTime is a number indicating the current time of the audio
    const [playAudio, setPlayAudio] = useState(false);
    const [script, setScript] = useState("welcome");
    const [audioTime, setAudioTime] = useState();

    // Render the App component
    return (
        <>
            {/* Render the AudioControl component and pass the state variables and setters as props */}
            <AudioControl
                playAudio={playAudio}
                setPlayAudio={setPlayAudio}
                script={script}
                setScript={setScript}
                setAudioTime={setAudioTime}
            />
            {/* Render the Canvas component from react-three/fiber */}
            <Canvas shadows camera={{ position: [0, 0, 7], fov: 30 }}>
                {/* Set the background color of the Canvas */}
                <color attach="background" args={["#ececec"]} />
                {/* Render the Experience component and pass the state variables as props */}
                <Experience
                    playAudio={playAudio}
                    script={script}
                    audioTime={audioTime}
                />
            </Canvas>
        </>
    );
}

// Export the App component as the default export
export default App;
