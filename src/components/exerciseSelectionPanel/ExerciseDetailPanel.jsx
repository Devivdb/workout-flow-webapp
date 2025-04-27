import React from 'react';
import MuscleGroupVisualizer from './MuscleGroupVisualizer.jsx';
import ExerciseSetsManager from './ExerciseSetsManager.jsx';

function ExerciseDetailPanel({
                                 activeExercise,
                                 selectedExercises,
                                 setsData,
                                 onAddSet,
                                 onInputChange,
                                 onDeleteSet
                             }) {
    return (
        <section className="filters-block">
            <div className="sets-section">
                <MuscleGroupVisualizer
                    activeExercise={activeExercise}
                    selectedExercises={selectedExercises}
                />

                <ExerciseSetsManager
                    activeExercise={activeExercise}
                    setsData={setsData}
                    onAddSet={onAddSet}
                    onInputChange={onInputChange}
                    onDeleteSet={onDeleteSet}
                />
            </div>
        </section>
    );
}

export default ExerciseDetailPanel;