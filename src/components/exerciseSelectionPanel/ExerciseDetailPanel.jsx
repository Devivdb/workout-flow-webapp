import MuscleGroupVisualizer from './MuscleGroupVisualizer.jsx';
import ExerciseSetsManager from './ExerciseSetsManager.jsx';

function ExerciseDetailPanel({
                                 activeExercise,
                                 selectedExercises,
                                 setsData,
                                 onAddSet,
                                 onInputChange,
                                 onDeleteSet,
                                 pageId = "page2"
                             }) {
    const pageClass = pageId === "page1" ? "page-search" : "page-workout-builder";

    return (
        <section className={`filters-block ${pageClass}`}>
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