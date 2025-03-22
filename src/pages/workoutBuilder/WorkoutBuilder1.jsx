import "./WorkoutBuilder1.css";
import useBackground from "../../hooks/useBackground.js";
import {useContext, useEffect} from "react";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import PopUpSelection from "../../components/ExerciseSelectionPanel/ExerciseSelectionPanel.jsx";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";


function WorkoutBuilder1() {

    //TODO Implement a new navbar on the right side with icons.

    ///////////////////// Background
    useBackground("workout-builder-background");

    /// Context
    const {
        selectedPrimaryMuscles,
        setExercises,
        selectedExercises,
        setsData
    } = useContext(FiltersContext)

    ///////////////////// API fetch
    useEffect(() => {
        async function fetchData() {
            const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
            setExercises(data);
        }

        fetchData();
    }, [selectedPrimaryMuscles]);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Function to format data for export
    const formatWorkoutData = () => {
        return selectedExercises.map((exercise) => ({
            name: exercise.name,
            equipment: exercise.equipment,
            level: exercise.level,
            force: exercise.force,
            muscle: exercise.muscle,
            mechanic: exercise.mechanic,
            sets: (setsData[exercise.name] || []).map(set =>
                `Reps: ${set.reps}, Weight: ${set.weight}kg`
            )
        }))
    }

    // Export as JSON
    const exportAsJSON = () => {
        const data = formatWorkoutData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        saveAs(blob, "workout.json");
    };

    // Export as CSV
    const exportAsCSV = () => {
        const data = formatWorkoutData();
        const csvContent =
            "Name,Equipment,Level,Force,Muscle,Mechanic,Sets\n" +
            data
                .map((exercise) =>
                    `${exercise.name},${exercise.equipment},${exercise.level},${exercise.force},${exercise.muscle},${exercise.mechanic},"${exercise.sets.join(" | ")}"`
                )
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "workout.csv");
    };

    //TODO add styling to pdf file and make the list of exercises more clear

    const exportAsPDF = () => {
        const data = formatWorkoutData();
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Workout Plan", 10, 10);

        let y = 20;
        data.forEach((exercise, index) => {
            doc.setFontSize(12);
            doc.text(`${index + 1}. ${exercise.name}`, 10, y);
            doc.setFontSize(10);
            doc.text(`- Equipment: ${exercise.equipment}`, 10, y + 5);
            doc.text(`- Level: ${exercise.level}`, 10, y + 10);
            doc.text(`- Force: ${exercise.force}`, 10, y + 15);
            doc.text(`- Muscle: ${exercise.muscle}`, 10, y + 20);
            doc.text(`- Mechanic: ${exercise.mechanic}`, 10, y + 25);

            // Format sets properly
            const setsText = exercise.sets.length > 0
                ? exercise.sets.join(" | ")
                : "None";
            doc.text(`- Sets: ${setsText}`, 10, y + 30);

            y += 40;
        });

        doc.save("workout plan.pdf");
    };

    return (
        <>
            <div className="export-buttons">
                <button onClick={exportAsJSON}>Export JSON</button>
                <button onClick={exportAsCSV}>Export CSV</button>
                <button onClick={exportAsPDF}>Export PDF</button>
            </div>
            <div className="workout-builder-container">
                <FiltersExercises className="con"/>
                <PopUpSelection/>
            </div>
        </>
    );
}

export default WorkoutBuilder1;