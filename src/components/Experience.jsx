// Import necessary modules and components
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";

// Define the Experience component
export const Experience = () => {
    // Use the useTexture hook from @react-three/drei to load a texture for the background
    const background = useTexture("backgrounds/background.jpg");

    // Use the useThree hook from @react-three/fiber to get the viewport
    const viewport = useThree((state) => state.viewport);

    // Render the Experience component
    return (
        <>
            {/* Add OrbitControls to allow the user to rotate, zoom, and pan the scene */}
            <OrbitControls />

            {/* Render the Avatar component and pass the position, scale, and state variables as props */}
            <Avatar position={[0, -3, 4]} scale={2} />

            {/* Add an Environment with a sunset preset */}
            <Environment preset="sunset" />

            {/* Add a mesh for the background */}
            <mesh>
                {/* The geometry of the mesh is a plane with the same dimensions as the viewport */}
                <planeGeometry args={[viewport.width, viewport.height]} />

                {/* The material of the mesh is a basic material with the background texture */}
                <meshBasicMaterial map={background} />
            </mesh>
        </>
    );
};
