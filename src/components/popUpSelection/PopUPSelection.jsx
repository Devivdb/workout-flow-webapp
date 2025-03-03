import "./PopUpSelection.css";
import { useContext, useEffect, useState } from "react";
import MuscleGroups from "../../assets/svg/MuscleGroups.svg?react";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";


function PopUpSelection1() {
    /// Context
    const {
        activeFilters,

    } = useContext(FiltersContext);

    /// State
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [clickedIndexes, setClickedIndexes] = useState([]);
    const [setsData, setSetsData] = useState({});
    const [activeExercise, setActiveExercise] = useState(null);

    /// Hook
    useEffect(() => {
        const filtered = activeFilters.exercises.filter(exercise =>
            (activeFilters.selectedLevel === "all" || exercise.level === activeFilters.selectedLevel) &&
            (activeFilters.selectedEquipment === "all" || exercise.equipment === activeFilters.selectedEquipment) &&
            (activeFilters.selectedForce === "all" || exercise.force === activeFilters.selectedForce) &&
            (activeFilters.selectedMechanic === "all" || exercise.mechanic === activeFilters.selectedMechanic)
        );

        setFilteredExercises(filtered);
    }, [activeFilters]);

    /// Functions
    const handleClick = (index) => {
        setClickedIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleDeleteExercise = (exerciseName) => {
        const indexToRemove = filteredExercises.findIndex(exercise => exercise.name === exerciseName);
        if (indexToRemove !== -1) {
            setClickedIndexes(prev => prev.filter(i => i !== indexToRemove));

            setSetsData(prev => {
                const { ...rest } = prev;
                return rest;
            });

            if (activeExercise === exerciseName) {
                setActiveExercise(null);
            }
        }
    };

    /// useEffect
    useEffect(() => {
        const selected = clickedIndexes.map(index => ({
            name: filteredExercises[index]?.name,
            equipment: filteredExercises[index]?.equipment,
            secondaryMuscles: filteredExercises[index]?.secondaryMuscles,
            primaryMuscles: filteredExercises[index]?.primaryMuscles
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
        const exercises = document.querySelectorAll('.selectable-exercise');

        exercises.forEach(exercise => {
            exercise.classList.remove('active');
        });

        const clickedExercise = Array.from(exercises).find(
            element => element.textContent.includes(exerciseName)
        );

        if (clickedExercise) {
            clickedExercise.classList.add('active');
        }
    };

    useEffect(() => {
        const svgElement = document.querySelector('.muscle-svg-target');
        if (!svgElement) return;

        svgElement.querySelectorAll('path').forEach(path => {
            path.classList.remove('highlight-primary', 'highlight-secondary');
        });

        if (!activeExercise) return;

        const activeExerciseData = selectedExercises.find(ex => ex.name === activeExercise);
        if (!activeExerciseData) return;

        if (activeExerciseData.primaryMuscles) {
            activeExerciseData.primaryMuscles.forEach(muscleName => {
                const muscleElements = svgElement.querySelectorAll(`.${muscleName.toLowerCase().replace(/ /g, '_')}`);
                muscleElements.forEach(element => {
                    element.classList.add('highlight-primary');
                });
            });
        }

        if (activeExerciseData.secondaryMuscles) {
            activeExerciseData.secondaryMuscles.forEach(muscleName => {
                const muscleElements = svgElement.querySelectorAll(`.${muscleName.toLowerCase().replace(/ /g, '_')}`);
                muscleElements.forEach(element => {
                    element.classList.add('highlight-secondary');
                });
            });
        }
    }, [activeExercise, selectedExercises]);

    return (
        <>
            <section className="filters-block">
                <h2>Filtered Exercises</h2>
                <div className="result">
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
                        <p>No exercises found or selected. Use the Search button to apply your filters.</p>
                    )}
                </div>
            </section>

            <section className="filters-block">
                <div className="selected-exercises">
                    <h2>Selected Exercises</h2>
                    <div
                        className="selected-exercises-wrapper"
                    >
                        {selectedExercises.map((exercise, index) => (
                            <p
                                key={index}
                                className={`selectable-exercise ${activeExercise === exercise.name ? 'active' : ''}`}
                                onClick={() => handleSelectedExerciseClick(exercise.name)}
                                style={{ cursor: "pointer" }}
                            >
                                {exercise.name} ({exercise.equipment})
                                <button
                                    className="sel-rem-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteExercise(exercise.name);
                                    }}>Remove</button>
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <section className="filters-block">
                <div className="sets-section">
                    <div className="svg-container">
                        <MuscleGroups className="muscle-svg-target" />
                    </div>
                    <h2>Sets for: {activeExercise}</h2>
                    {setsData[activeExercise]?.length > 0 && (
                        <div className="add-sets">
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
                                    <button
                                        className="sets-rem-btn"
                                        onClick={() => handleDeleteSet(activeExercise, setIndex)}
                                    >Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        className="add-sets-btn"
                        onClick={() => handleAddSet(activeExercise)}
                        disabled={!activeExercise}
                    >
                        Add Set
                    </button>
                </div>
            </section>
        </>
    );
}

export default PopUpSelection1;