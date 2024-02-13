// Import necessary modules and components
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import AudioControl from "./components/AudioControl";
import Chat from "./components/Chat";

// Define the App component
function App() {
    // Render the App component
    return (
        <>
            {/* Render the AudioControl component and pass the state variables and setters as props */}
            <AudioControl />
            {/* Render the Chat component */}
            <Chat />
            {/* Render the Canvas component from react-three/fiber */}
            <Canvas shadows camera={{ position: [0, 0, 7], fov: 30 }}>
                {/* Set the background color of the Canvas */}
                <color attach="background" args={["#ececec"]} />
                {/* Render the Experience component and pass the state variables as props */}
                <Experience />
            </Canvas>
        </>
    );
}

// Export the App component as the default export
export default App;
