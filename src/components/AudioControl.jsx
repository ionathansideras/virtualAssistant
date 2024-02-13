import React, { useEffect, useMemo } from "react";
// Import the useSelector and useDispatch hooks from Redux
import { useSelector, useDispatch } from "react-redux";
// Import the action creators from the store
import { setPlayAudio, setScript, setAudioTime } from "../redux/store.js";

export default function AudioControl() {
    // Use the useSelector hook to access the state variables from the Redux store
    const { playAudio, script } = useSelector((state) => state.audio);

    // Use the useDispatch hook to get the dispatch function
    const dispatch = useDispatch();

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
                // Dispatch the removeCar action with the car's ID as the payload
                dispatch(setAudioTime(audio.currentTime));
            }, 1000 / 60); // Update approximately 60 times per second
        } else {
            // If playAudio is false, pause the audio and reset the audioTime state variable.
            audio.pause();
            dispatch(setAudioTime(0));
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
                    onChange={() => dispatch(setPlayAudio(!playAudio))}
                    className="control-input"
                />
            </div>
            <div className="control-group">
                <label className="control-label">Script:</label>
                <select
                    value={script}
                    onChange={(e) => dispatch(setScript(e.target.value))}
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
