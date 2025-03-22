import React, { useEffect } from 'react';
import MuscleGroups from "../../assets/svg/MuscleGroups.svg?react";

function MuscleGroupVisualizer({ activeExercise, selectedExercises }) {
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
                const muscleElements = svgElement.querySelectorAll(
                    `.${muscleName.toLowerCase().replace(/ /g, '_')}`
                );
                muscleElements.forEach(element => {
                    element.classList.add('highlight-primary');
                });
            });
        }

        if (activeExerciseData.secondaryMuscles) {
            activeExerciseData.secondaryMuscles.forEach(muscleName => {
                const muscleElements = svgElement.querySelectorAll(
                    `.${muscleName.toLowerCase().replace(/ /g, '_')}`
                );
                muscleElements.forEach(element => {
                    element.classList.add('highlight-secondary');
                });
            });
        }
    }, [activeExercise, selectedExercises]);

    return (
        <div className="svg-container">
            <MuscleGroups className="muscle-svg-target" />
        </div>
    );
}

export default MuscleGroupVisualizer;