import React from 'react';

function SelectedExercisesList({
                                   selectedExercises,
                                   activeExercise,
                                   onExerciseClick,
                                   onDeleteExercise
                               }) {
    return (
        <section className="filters-block">
            <h2>Selected Exercises</h2>
            <div className="result">
                {selectedExercises.length > 0 ? (
                    selectedExercises.map((exercise, index) => (
                        <p
                            key={index}
                            className={`selectable-exercise ${activeExercise === exercise.name ? 'active' : ''}`}
                            onClick={() => onExerciseClick(exercise.name)}
                        >
                            {exercise.name} ({exercise.equipment})
                            <button
                                className="sel-rem-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteExercise(exercise.name);
                                }}
                            >
                                Remove
                            </button>
                        </p>
                    ))
                ) : (
                    <p>No exercises selected. Click on exercises in the filtered list to select them.</p>
                )}
            </div>
        </section>
    );
}

export default SelectedExercisesList;