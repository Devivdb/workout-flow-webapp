import { useContext, useState } from 'react';
import { FiltersContext } from '../../context/filtersContext/FiltersContext';

function FilteredExercisesList({
                                   filteredExercises,
                                   selectedExercises,
                                   onExerciseSelection,
                                   pageId
                               }) {
    const { shouldShowInstructions } = useContext(FiltersContext);

    const [expandedExerciseIndex, setExpandedExerciseIndex] = useState(null);

    const toggleInstructions = (index) => {
        if (expandedExerciseIndex === index) {
            setExpandedExerciseIndex(null);
        } else {
            setExpandedExerciseIndex(index);
        }
    };

    console.log(filteredExercises)

    return (
        <section className="filters-block filters-results">
            <h2>Filtered Exercises</h2>
            <div className="result">
                {filteredExercises.length > 0 ? (
                    <div className="outer">
                        {filteredExercises.map((exercise, index) => {
                            const isSelected = selectedExercises.some(ex => ex.name === exercise.name);

                            return (
                                <div
                                    className={`inner ${isSelected ? "clicked" : ""} ${expandedExerciseIndex === index ? "with-instructions" : ""}`}
                                    key={index}
                                    onClick={() => onExerciseSelection(exercise)}
                                >
                                    <h3>{exercise.name}</h3>
                                    <p><b>Equipment:</b> {exercise.equipment}</p>
                                    <p><b>Level:</b> {exercise.level}</p>
                                    <p><b>Force:</b> {exercise.force}</p>
                                    <p><b>Mechanic:</b> {exercise.mechanic}</p>
                                    <p><b>Muscle group:</b> {exercise.primaryMuscles[0]}</p>

                                    {shouldShowInstructions(pageId) && exercise.instructions && exercise.instructions.length > 0 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleInstructions(index);
                                                }}
                                                className="instructions-toggle"
                                            >
                                                {expandedExerciseIndex === index ? "Hide Instructions" : "Show Instructions"}
                                            </button>

                                            {expandedExerciseIndex === index && (
                                                <div className="instructions">
                                                    <p><b>Instructions:</b></p>
                                                    <ol>
                                                        {exercise.instructions.map((step, stepIndex) => (
                                                            <li key={stepIndex}>{step}</li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No exercises found or selected. Use the Search button to apply your filters.</p>
                )}
            </div>
        </section>
    );
}

export default FilteredExercisesList;