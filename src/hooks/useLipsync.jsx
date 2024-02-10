import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { CORRESPONDING } from "../constants";

export function useLipsync({ nodes, props }) {
    // Destructure the audioTime and script from the props object.
    const { audioTime, script } = props;

    // Use the useLoader hook from the three.js library to load a JSON file.
    const jsonFile = useLoader(THREE.FileLoader, `/audio/${script}.json`);

    // Parse the loaded JSON file into a JavaScript object.
    const lipsync = JSON.parse(jsonFile);

    // Create variables for easier access
    const headInfluences = nodes.Wolf3D_Head.morphTargetInfluences;
    const headDictionary = nodes.Wolf3D_Head.morphTargetDictionary;
    const teethInfluences = nodes.Wolf3D_Teeth.morphTargetInfluences;
    const teethDictionary = nodes.Wolf3D_Teeth.morphTargetDictionary;

    
    useFrame(() => {
        const currentAudioTime = audioTime;
        
        // Iterate over the values of the CORRESPONDING object.
        // The CORRESPONDING object maps mouth cue values to morph target names.
        Object.values(CORRESPONDING).forEach((value) => {
            // For each value, set the corresponding morph target influence of the Wolf3D_Head node to 0.
            // Morph target influences determine how much a morph target affects the shape of the model.
            // Setting the influence to 0 effectively disables the morph target.
            // so it makes the face look neutral.
            headInfluences[headDictionary[value]] = 0;

            // Do the same for the Wolf3D_Teeth node.
            teethInfluences[teethDictionary[value]] = 0;
        });

        // Iterate over the mouthCues array in the lipsync data.
        // Each mouthCue object in the array represents a time range during which a certain mouth shape should be shown.
        for (let i = 0; i < lipsync.mouthCues.length; i++) {
            const mouthCue = lipsync.mouthCues[i];

            // Check if the current audio time falls within the start and end times of the current mouth cue.
            if (
                currentAudioTime >= mouthCue.start &&
                currentAudioTime <= mouthCue.end
            ) {
                // If the current audio time is within the range of the current mouth cue,
                // set the corresponding morph target influence of the Wolf3D_Head node to 1.
                // This effectively enables the morph target, causing the model to show the mouth shape corresponding to the mouth cue.
                headInfluences[
                    headDictionary[CORRESPONDING[mouthCue.value]]
                ] = 1;

                // Do the same for the Wolf3D_Teeth node.
                teethInfluences[
                    teethDictionary[CORRESPONDING[mouthCue.value]]
                ] = 1;

                // Break out of the loop as soon as a matching mouth cue is found.
                // This assumes that the mouthCues array is sorted by start time and that the cues do not overlap.
                break;
            }
        }
    });
}
