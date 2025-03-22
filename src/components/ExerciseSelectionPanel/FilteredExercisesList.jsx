import React from 'react';

function FilteredExercisesList({
                                   filteredExercises,
                                   selectedExercises,
                                   onExerciseSelection
                               }) {
    return (
        <section className="filters-block">
            <h2>Filtered Exercises</h2>
            <div className="result">
                {filteredExercises.length > 0 ? (
                    <div className="outer">
                        {filteredExercises.map((exercise, index) => {
                            const isSelected = selectedExercises.some(ex => ex.name === exercise.name);

                            return (
                                <div
                                    className={`inner ${isSelected ? "clicked" : ""}`}
                                    key={index}
                                    onClick={() => onExerciseSelection(exercise)}
                                >
                                    <h3>{exercise.name}</h3>
                                    <p><b>Equipment:</b> {exercise.equipment}</p>
                                    <p><b>Level:</b> {exercise.level}</p>
                                    <p><b>Force:</b> {exercise.force}</p>
                                    <p><b>Mechanic:</b> {exercise.mechanic}</p>
                                    <p><b>Muscle group:</b> {exercise.primaryMuscles[0]}</p>
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