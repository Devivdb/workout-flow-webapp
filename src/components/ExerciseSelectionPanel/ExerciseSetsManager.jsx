import React from 'react';

function ExerciseSetsManager({
                                 activeExercise,
                                 setsData,
                                 onAddSet,
                                 onInputChange,
                                 onDeleteSet
                             }) {
    return (
        <div>
            <h2>Sets for: {activeExercise || "Select an exercise"}</h2>
            {activeExercise && setsData[activeExercise]?.length > 0 && (
                <div className="add-sets">
                    {setsData[activeExercise].map((set, setIndex) => (
                        <div key={setIndex} className="set-input">
                            <input
                                type="number"
                                placeholder="Reps"
                                value={set.reps}
                                onChange={(e) => onInputChange(activeExercise, setIndex, "reps", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Weight"
                                value={set.weight}
                                onChange={(e) => onInputChange(activeExercise, setIndex, "weight", e.target.value)}
                            />
                            <button
                                className="sets-rem-btn"
                                onClick={() => onDeleteSet(activeExercise, setIndex)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button
                className="add-sets-btn"
                onClick={() => onAddSet(activeExercise)}
                disabled={!activeExercise}
            >
                Add Set
            </button>
        </div>
    );
}

export default ExerciseSetsManager;