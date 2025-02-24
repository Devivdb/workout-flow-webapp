import "./WorkoutBuilder1.css";
import useBackground from "../../hooks/useBackground.js";
import {useContext, useEffect} from "react";
import {MuscleContext} from "../../context/muscleContext/MuscleContext.jsx";
import {ExercisesContext} from "../../context/exercisesContext/ExercisesContext.jsx";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import FiltersExercises1 from "../../components/filterExercises/FiltersExercises1.jsx";
import PopUpSelection from "../../components/popUpSelection/PopUPSelection.jsx";


function WorkoutBuilder1() {

    ///////////////////// Background
    useBackground("workout-builder-background");

    /// state
    const { selectedMuscle } = useContext(MuscleContext)
    const { setExercises } = useContext(ExercisesContext)

    ///////////////////// API fetch
    useEffect(() => {
        async function fetchData() {
            const data = await fetchExercisesByEquipment(selectedMuscle);
            setExercises(data);
        }

        fetchData();
    }, [selectedMuscle]);


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