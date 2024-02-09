import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import {Avatar} from './Avatar'
import { useThree } from "@react-three/fiber";

export const Experience = ({playAudio, script, audioTime}) => {

  const background = useTexture("backgrounds/background.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position={[0,-3,4]} scale={2} playAudio={playAudio} script={script} audioTime={audioTime}/>
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={background} />
      </mesh>
    </>
  );
};
