import "./WorkoutBuilder1.css";
import useBackground from "../../hooks/useBackground.js";
import {useContext, useEffect} from "react";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import ExerciseSelectionPanel from "../../components/exerciseSelectionPanel/ExerciseSelectionPanel.jsx";


function WorkoutBuilder1() {

    useBackground("workout-builder-background");

    const {
        selectedPrimaryMuscles,
        setExercises,
        selectedExercises,
        setsData
    } = useContext(FiltersContext)

    useEffect(() => {
        async function fetchData() {
            const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
            setExercises(data);
        }

        fetchData();
    }, [selectedPrimaryMuscles]);



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

    const exportAsJSON = () => {
        const data = formatWorkoutData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        saveAs(blob, "workout.json");
    };

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

    const exportAsPDF = () => {
        const data = formatWorkoutData();
        const doc = new jsPDF();
        doc.setFontSize(25);
        doc.setFont("montserrat, sans-serif", "Bold")
        doc.text("Workout Plan", 10, 10);

        let y = 20;
        data.forEach((exercise, index) => {
            doc.setFont("inter sans-serif", 'normal');
            doc.setFontSize(15);
            doc.text(`${index + 1}. ${exercise.name}`, 10, y);
            doc.setFontSize(10);

            const getInfoOrDefault = (value) => value !== undefined ? value : "Information not available";

            doc.text(`- Equipment: ${getInfoOrDefault(exercise.equipment)}`, 10, y + 5);
            doc.text(`- Level: ${getInfoOrDefault(exercise.level)}`, 10, y + 10);
            doc.text(`- Force: ${getInfoOrDefault(exercise.force)}`, 10, y + 15);
            doc.text(`- Muscle: ${getInfoOrDefault(exercise.muscle)}`, 10, y + 20);
            doc.text(`- Mechanic: ${getInfoOrDefault(exercise.mechanic)}`, 10, y + 25);

            y += 30;
            if (exercise.sets && exercise.sets.length > 0) {
                doc.text("- Sets:", 10, y);
                y += 5;
                doc.setFont("inter sans-serif", 'normal');
                doc.setFontSize(10);

                exercise.sets.forEach((set, setIndex) => {
                    doc.text(`  ${setIndex + 1}. ${set}`, 15, y);
                    y += 5;
                });
            } else {
                doc.text("- Sets: None", 10, y);
                y += 5;
            }

            y += 10;
        });

        doc.save("workout plan.pdf");
    };

    return (
        <>
            <div className="workout-builder-toolbar">
                <h1>Workout builder</h1>
                <div className="export-buttons">
                    <button onClick={exportAsJSON}>Export JSON</button>
                    <button onClick={exportAsCSV}>Export CSV</button>
                    <button onClick={exportAsPDF}>Export PDF</button>
                </div>
            </div>
            <div className="workout-builder-container">
                <FiltersExercises/>
                <ExerciseSelectionPanel pageId="page2"/>
            </div>
        </>
    );
}

export default WorkoutBuilder1;