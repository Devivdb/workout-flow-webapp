import "./FiltersExercises.css";

const FiltersExercises = ({
                     selectedEquipment,
                     setSelectedEquipment,
                     selectedLevel,
                     setSelectedLevel,
                     selectedForce,
                     setSelectedForce,
                     selectedMuscle,
                     setSelectedMuscle,
                     selectedMechanic,
                     setSelectedMechanic,
                     equipmentTypes,
                     forceTypes,
                     muscleGroups,
                     mechanicTypes,
                     fetchExercises
                 }) => {
    return (
        <div className="filters-exercises">

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
            <div className="equipment-grid">
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
                <label>Force:</label>
                <select value={selectedForce} onChange={(e) => setSelectedForce(e.target.value)}>
                    {forceTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <label>Muscle Group:</label>
                <select value={selectedMuscle} onChange={(e) => setSelectedMuscle(e.target.value)}>
                    {muscleGroups.map((type) => (
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
            <button onClick={fetchExercises} className="search-button">
                Search
            </button>
        </div>
    );
};

export default FiltersExercises;