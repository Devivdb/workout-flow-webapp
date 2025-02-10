import './Highlights.css'
import useBackground from "../../../../workout-flow-webapp/src/hooks/useBackground.js";

function Highlights() {

    useBackground("highlights-background")

    return (
        <>
            <div className="outer-container-wrapper-highlights">
                <h1>Highlights</h1>
                <div className="inner-container-wrapper-highlights">
                    <div className="highlight">
                        <h2>Custom Workout Creation & Management</h2>
                        <p>
                            Easily create and customize workout routines to fit your fitness goals. Add exercises, set
                            repetitions, and organize workout schedules—all in one place.
                        </p>
                    </div>
                    <div className="highlight">
                        <h2>Custom Workout Creation & Management</h2>
                        <p>
                            Easily create and customize workout routines to fit your fitness goals. Add exercises, set
                            repetitions, and organize workout schedules—all in one place.
                        </p>
                    </div>
                    <div className="highlight">
                        <h2>Custom Workout Creation & Management</h2>
                        <p>
                            Easily create and customize workout routines to fit your fitness goals. Add exercises, set
                            repetitions, and organize workout schedules—all in one place.
                        </p>
                    </div>
                    <div className="highlight">
                        <h2>Custom Workout Creation & Management</h2>
                        <p>
                            Easily create and customize workout routines to fit your fitness goals. Add exercises, set
                            repetitions, and organize workout schedules—all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Highlights;