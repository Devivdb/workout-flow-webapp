import "./WorkoutBuilder1.css";
import useBackground from "../../hooks/useBackground.js";
import {useContext, useEffect} from "react";
import {PrimaryMusclesContext} from "../../context/PrimaryMusclesContext/PrimaryMusclesContext.jsx";
import {ExercisesContext} from "../../context/exercisesContext/ExercisesContext.jsx";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import FiltersExercises1 from "../../components/filterExercises/FiltersExercises1.jsx";
import PopUpSelection from "../../components/popUpSelection/PopUPSelection.jsx";


function WorkoutBuilder1() {

    ///////////////////// Background
    useBackground("workout-builder-background");

    /// state
    const { selectedPrimaryMuscles } = useContext(PrimaryMusclesContext)
    const { setExercises } = useContext(ExercisesContext)

    ///////////////////// API fetch
    useEffect(() => {
        async function fetchData() {
            const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
            setExercises(data);
        }

        fetchData();
    }, [selectedPrimaryMuscles]);

    return (
        <>
            <div className="workout-builder-container">
                <FiltersExercises1/>
                <PopUpSelection/>
            </div>
        </>
    );
}

export default WorkoutBuilder1;