import axios from "axios";

async function fetchExercisesByEquipment(muscleGroupList) {
    try {
        const response = await axios.get(
            `https://${import.meta.env.VITE_RAPIDAPI_HOST}/exercises/muscle/${muscleGroupList}`,
            {
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
                    "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
}

export default fetchExercisesByEquipment;