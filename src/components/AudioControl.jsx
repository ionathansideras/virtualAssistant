import React, { useEffect, useMemo } from "react";

export default function AudioControl(props) {
    // Destructure the props to get the state variables and setters
    const { playAudio, setPlayAudio, script, setScript, setAudioTime } = props;

    // Use the useMemo hook to create a new audio object only when the script changes.
    // This is to avoid creating a new audio object every time the component re-renders,
    // which would happen every time the state {audioTime} changes.
    const audio = useMemo(() => new Audio(`/audio/${script}.ogg`), [script]);

    // Define a function to handle the end of the audio.
    // This function clears the interval if it exists.
    const handleAudioEnd = (interval) => {
        if (interval) {
            clearInterval(interval);
        }
    };

    // Use the useEffect hook to add side effects to the component.
    useEffect(() => {
        let interval;

        // Add an event listener to the audio object to handle the end of the audio.
        audio.addEventListener("ended", () => handleAudioEnd(interval));

        // If playAudio is true, start playing the audio and set up an interval to update
        // the audioTime state variable approximately 60 times per second.
        if (playAudio) {
            audio.play();
            interval = setInterval(() => {
                setAudioTime(audio.currentTime);
            }, 1000 / 60); // Update approximately 60 times per second
        } else {
            // If playAudio is false, pause the audio and reset the audioTime state variable.
            audio.pause();
            setAudioTime();
        }

        // Return a cleanup function to remove the interval and the event listener when
        // the component unmounts or when the audio or playAudio variables change.
        return () => {
            if (interval) {
                clearInterval(interval);
            }
            audio.removeEventListener("ended", () => handleAudioEnd(interval));
        };
    }, [audio, playAudio]);

    // Render the controls for playing the audio and selecting the script.
    return (
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
    );
}