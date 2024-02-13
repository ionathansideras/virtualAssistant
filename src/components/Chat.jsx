import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AudioRecorder from "./AudioRecorder";
import { usePostUsersInputMutation, addResponse } from "../redux/store";

export default function Chat() {
    const responses = useSelector((state) => state.responses);
    const [audioData, setAudioData] = useState(null); // New state variable for the audio data
    const [postUsersInput, response] = usePostUsersInputMutation();
    const [userText, setUserText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        postUsersInput({ userText, audioData }); // Send the user's text and audio data to the server
        dispatch(addResponse(response));
    };

    return (
        <form onSubmit={handleSubmit}>
            {responses.map((response, index) => (
                <div key={index}>
                    <p className="userText">{response.userText}</p>
                    <p className="aiTextResponse">{response.aiTextResponse}</p>
                    <p className="aiVoiceResponse">
                        {response.aiVoiceResponse}
                    </p>
                </div>
            ))}
            <div>
                <AudioRecorder setAudioData={setAudioData} />
                <input
                    type="text"
                    value={userText}
                    onChange={(e) => setUserText(e.target.current)}
                />
                <button>Send</button>
            </div>
        </form>
    );
}
