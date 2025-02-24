import "./PopUpSelection.css";
import {useContext, useEffect, useState} from "react";
import {ExercisesContext} from "../../context/exercisesContext/ExercisesContext.jsx";
import {LevelContext} from "../../context/levelContext/LevelContext.jsx";
import {EquipmentContext} from "../../context/equipmentContext/EquipmentContext.jsx";
import {ForceContext} from "../../context/forceContext/ForceContext.jsx";
import {MechanicContext} from "../../context/mechanicContext/MechanicContext.jsx";
import MuscleGroups from "../../assets/svg/MuscleGroups.svg?react";


function PopUpSelection1() {

    /// Context
    const {exercises} = useContext(ExercisesContext);
    const {selectedLevel} = useContext(LevelContext);
    const {selectedEquipment} = useContext(EquipmentContext);
    const {selectedForce} = useContext(ForceContext);
    const {selectedMechanic} = useContext(MechanicContext);

    /// State
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [clickedIndexes, setClickedIndexes] = useState([]);
    const [setsData, setSetsData] = useState({});
    const [activeExercise, setActiveExercise] = useState(null);

    /// Hook
    useEffect(() => {
        const filtered = exercises.filter(exercise =>
            (selectedLevel === "all" || exercise.level === selectedLevel) &&
            (selectedEquipment === "all" || exercise.equipment === selectedEquipment) &&
            (selectedForce === "all" || exercise.force === selectedForce) &&
            (selectedMechanic === "all" || exercise.mechanic === selectedMechanic)
        );

        setFilteredExercises(filtered);
    }, [selectedLevel, selectedEquipment, selectedForce, selectedMechanic, exercises]);

    /// Functions
    const handleClick = (index) => {
        setClickedIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    useEffect(() => {
        const selected = clickedIndexes.map(index => ({
            name: filteredExercises[index]?.name,
            equipment: filteredExercises[index]?.equipment,
        }));

        setSelectedExercises(selected);
    }, [clickedIndexes, filteredExercises]);

    const handleAddSet = (exerciseName) => {
        setSetsData((prev) => ({
            ...prev,
            [exerciseName]: [...(prev[exerciseName] || []), { reps: "", weight: "" }]
        }));
    };

    const handleInputChange = (exerciseName, setIndex, field, value) => {
        setSetsData((prev) => ({
            ...prev,
            [exerciseName]: prev[exerciseName].map((set, index) =>
                index === setIndex ? { ...set, [field]: value } : set
            )
        }));
    };

    const handleDeleteSet = (exerciseName, setIndex) => {
        setSetsData((prev) => {
            const updatedSets = prev[exerciseName].filter((_, index) => index !== setIndex);
            return {
                ...prev,
                [exerciseName]: updatedSets,
            };
        });
    };

    const handleSelectedExerciseClick = (exerciseName) => {
        setActiveExercise((prev) => (prev === exerciseName ? null : exerciseName));
    };

    return (
        <>
            <div className="result">
                <h2>Filtered Exercises</h2>
                {filteredExercises.length > 0 ? (
                    <div className="outer">
                        {filteredExercises.map((exercise, index) => (
                            <div
                                className={`inner ${clickedIndexes.includes(index) ? "clicked" : ""}`}
                                key={index}
                                onClick={() => handleClick(index)}
                            >
                                <h3>{exercise.name}</h3>
                                <p><b>Equipment:</b> {exercise.equipment}</p>
                                <p><b>Level:</b> {exercise.level}</p>
                                <p><b>Force:</b> {exercise.force}</p>
                                <p><b>Mechanic:</b> {exercise.mechanic}</p>
                                <p><b>Muscle group:</b> {exercise.primaryMuscles[0]}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No exercises found.</p>
                )}
            </div>

                <div className="selected-exercises">
                    <h3>Selected Exercises:</h3>
                    <div>
                        {selectedExercises.map((exercise, index) => (
                            <p
                                key={index}
                                className="selectable-exercise"
                                onClick={() => handleSelectedExerciseClick(exercise.name)}
                                style={{cursor: "pointer", color: activeExercise === exercise.name}}
                            >
                                <b>{exercise.name}</b> ({exercise.equipment})
                            </p>
                        ))}
                    </div>
                </div>

                <div className="sets-section">
                    <div className="svg-container">
                        <MuscleGroups className="muscle-svg"/>
                    </div>
                    <h3>Sets for: {activeExercise}</h3>
                    <button onClick={() => handleAddSet(activeExercise)}>Add Set</button>
                    {setsData[activeExercise]?.length > 0 && (
                        <div>
                            {setsData[activeExercise].map((set, setIndex) => (
                                <div key={setIndex} className="set-input">
                                    <input
                                        type="number"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChange={(e) => handleInputChange(activeExercise, setIndex, "reps", e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChange={(e) => handleInputChange(activeExercise, setIndex, "weight", e.target.value)}
                                    />
                                    <button onClick={() => handleDeleteSet(activeExercise, setIndex)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </>
    );
}

export default PopUpSelection1;
