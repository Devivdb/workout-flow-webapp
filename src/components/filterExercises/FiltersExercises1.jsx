import "./FiltersExercises.css";
import {useContext, useEffect} from "react";
import MuscleGroups from "/src/assets/svg/MuscleGroups.svg?react";
import {PrimaryMusclesContext} from "../../context/PrimaryMusclesContext/PrimaryMusclesContext.jsx";
import {LevelContext} from "../../context/levelContext/LevelContext.jsx";
import {EquipmentContext} from "../../context/equipmentContext/EquipmentContext.jsx";
import {ForceContext} from "../../context/forceContext/ForceContext.jsx";
import {MechanicContext} from "../../context/mechanicContext/MechanicContext.jsx";


function FiltersExercises1() {

    /// Context
    const {selectedPrimaryMuscles, setSelectedPrimaryMuscles} = useContext(PrimaryMusclesContext)
    const {selectedLevel, setSelectedLevel} = useContext(LevelContext)
    const {selectedEquipment, setSelectedEquipment} = useContext(EquipmentContext)
    const {selectedForce, setSelectedForce} = useContext(ForceContext)
    const {selectedMechanic, setSelectedMechanic} = useContext(MechanicContext)

    /// State

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
            <section className="filters-block">
                <div className="svg-container" onClick={handleMuscleClick}>
                    <MuscleGroups className="muscle-svg"/>
                </div>
                <div className="level-buttons">
                    <button
                        onClick={() => setSelectedLevel("beginner")}
                        className="level-button"
                        disabled={selectedLevel === "beginner"}
                    >
                        Beginner
                    </button>
                    <button
                        onClick={() => setSelectedLevel("intermediate")}
                        className="level-button"
                        disabled={selectedLevel === "intermediate"}
                    >
                        Intermediate
                    </button>
                    <button
                        onClick={() => setSelectedLevel("advanced")}
                        className="level-button"
                        disabled={selectedLevel === "advanced"}
                    >
                        Advanced
                    </button>
                </div>
                <div className="equipment-options">
                    <h2 className="equipment-label">Equipment type:</h2>
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
                <div className="drop-down-menu">
                    <label>Force:</label>
                    <select value={selectedForce} onChange={(e) => setSelectedForce(e.target.value)}>
                        {forceTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label>Mechanic:</label>
                    <select value={selectedMechanic} onChange={(e) => setSelectedMechanic(e.target.value)}>
                        {mechanicTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </section>
        </>
    );
};

export default FiltersExercises1;