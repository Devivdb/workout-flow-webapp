import "./Sets.css"

const Sets = ({ selectedExercise, sets, updateSets }) => {
    const addSet = () => {
        updateSets([...sets, { reps: "", weight: "" }]);
    };

    const deleteSet = (index) => {
        updateSets(sets.filter((_, i) => i !== index));
    };

    const updateSet = (index, field, value) => {
        const updatedSets = [...sets];
        updatedSets[index][field] = value;
        updateSets(updatedSets);
    };

    return (
        <div className="outer-container-wrapper-sets">
            <h2>Sets for {selectedExercise}</h2>
            {sets.map((set, index) => (
                <div key={index}>
                    <input
                        type="number"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) => updateSet(index, "reps", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Weight (KG)"
                        value={set.weight}
                        onChange={(e) => updateSet(index, "weight", e.target.value)}
                    />
                    <button onClick={() => deleteSet(index)}>Delete</button>
                </div>
            ))}
            <button onClick={addSet}>Add Set</button>
        </div>
    );
};

export default Sets;
