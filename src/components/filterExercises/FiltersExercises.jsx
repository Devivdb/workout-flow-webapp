import "./FiltersExercises.css";
import { useContext, useEffect } from "react";
import MuscleGroups from "/src/assets/svg/MuscleGroups.svg?react";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";

function FiltersExercises() {

    const {
        selectedPrimaryMuscles,
        setSelectedPrimaryMuscles,
        selectedLevel,
        setSelectedLevel,
        selectedEquipment,
        setSelectedEquipment,
        selectedForce,
        setSelectedForce,
        selectedMechanic,
        setSelectedMechanic,

        // Actions
        applyFilters,
        resetFilters,
        hasChanges
    } = useContext(FiltersContext);

    /// Variables
    const equipmentTypes = ["barbell", "dumbbell", "cable", "machine", "kettlebells", "bands", "medicine_ball", "exercise_ball", "body_only", "foam_roll", "other"];
    const forceTypes = ["all", "push", "pull", "static"];
    const mechanicTypes = ["all", "compound", "isolation"];

    /// Hooks
    useEffect(() => {
        document.querySelectorAll(".muscle-svg path").forEach((el) => {
            el.classList.remove("selected");
        });

        if (selectedPrimaryMuscles) {
            const selectedElements = document.querySelectorAll(`.${selectedPrimaryMuscles}`);
            selectedElements.forEach((el) => el.classList.add("selected"));
        }
    }, [selectedPrimaryMuscles]);

    const handleMuscleClick = (event) => {
        const clickedMuscle = event.target.classList[0];
        if (clickedMuscle) {
            setSelectedPrimaryMuscles(clickedMuscle);
        }
    };

    return (
        <>
            <section className="filters-block filter-apply">
                <h2>Filters</h2>
                <div className="svg-container" onClick={handleMuscleClick}>
                    <MuscleGroups className="muscle-svg"/>
                </div>
                <div className="level-buttons">
                    <button
                        onClick={() => setSelectedLevel("beginner")}
                        className={`level-button ${selectedLevel === "beginner" ? "active" : ""}`}
                        disabled={selectedLevel === "beginner"}
                    >
                        Beginner
                    </button>
                    <button
                        onClick={() => setSelectedLevel("intermediate")}
                        className={`level-button ${selectedLevel === "intermediate" ? "active" : ""}`}
                        disabled={selectedLevel === "intermediate"}
                    >
                        Intermediate
                    </button>
                    <button
                        onClick={() => setSelectedLevel("advanced")}
                        className={`level-button ${selectedLevel === "advanced" ? "active" : ""}`}
                        disabled={selectedLevel === "advanced"}
                    >
                        Advanced
                    </button>
                </div>
                <h2 className="equipment-label">Equipment type:</h2>
                <div className="outer-wapper-filters">
                    <div className="equipment-options">
                        {equipmentTypes.map((equipment) => (
                            <label key={equipment} className="equipment-item">
                                <input
                                    type="radio"
                                    name="equipment"
                                    value={equipment}
                                    checked={selectedEquipment === equipment}
                                    onChange={(e) => setSelectedEquipment(e.target.value)}
                                />
                                {equipment.replace("_", " ")}
                            </label>
                        ))}
                    </div>
                    <div className="drop-down-menu-wrapper">
                        <div className="drop-down-menu">
                            <label>Mechanic:</label>
                            <select
                                className="drop-down-menu-items"
                                value={selectedMechanic}
                                onChange={(e) => setSelectedMechanic(e.target.value)}>
                                {mechanicTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="drop-down-menu">
                            <label>Force:</label>
                            <select
                                className="drop-down-menu-items"
                                value={selectedForce}
                                onChange={(e) => setSelectedForce(e.target.value)}>
                                {forceTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="apply-rest-btn">
                    <button
                        className={`search-btn ${hasChanges ? 'has-changes' : ''}`}
                        disabled={!hasChanges}
                        onClick={applyFilters}
                    >
                        Search
                    </button>
                    <button
                        className="reset-filters-btn"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            </section>
        </>
    );
}

export default FiltersExercises;