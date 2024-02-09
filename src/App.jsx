import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import React, { useRef, useEffect, useMemo, useState } from "react";

function App() {
    // Initialize state variables for playAudio and script
    const [playAudio, setPlayAudio] = useState(false);
    const [script, setScript] = useState("welcome");
    const [audioTime, setAudioTime] = useState();

    const audio = useMemo(() => new Audio(`/audio/${script}.ogg`), [script]);

    const animationFrameId = useRef();

    useEffect(() => {
        if (playAudio) {
            audio.play();
        } else {
            audio.pause();
        }

        if (!playAudio) {
            setAudioTime();
        }
    }, [playAudio, script]);

    // Update audioTime on each animation frame
    useEffect(() => {
        const updateTime = () => {
            setAudioTime(audio.currentTime);
            animationFrameId.current = requestAnimationFrame(updateTime);
        };

        if (playAudio) {
            updateTime();
        }

        return () => {
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [audio, playAudio]);

    return (
        <>
            <div className="controls">
                <div className="control-group">
                    <label className="control-label">Play Audio:</label>
                    <input
                        type="checkbox"
                        checked={playAudio}
                        onChange={() => setPlayAudio(!playAudio)}
                        className="control-input"
                    />
                </div>
                <div className="control-group">
                    <label className="control-label">Script:</label>
                    <select
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        className="control-input"
                    >
                        <option value="welcome">Welcome</option>
                        <option value="joke">Joke</option>
                        <option value="story">Story</option>
                    </select>
                </div>
            </div>
            <Canvas shadows camera={{ position: [0, 0, 7], fov: 30 }}>
                <color attach="background" args={["#ececec"]} />
                <Experience
                    playAudio={playAudio}
                    script={script}
                    audioTime={audioTime}
                />
            </Canvas>
        </>
    );
}

export default App;
