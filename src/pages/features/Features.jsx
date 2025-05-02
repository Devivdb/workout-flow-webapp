import './Features.css'
import useBackground from "../../../../workout-flow-webapp/src/hooks/useBackground.js";
import {useState} from "react";
import exerciseFinder from "/src/assets/pictures/exerciseFinder.png"
import Workoutbuilder from "/src/assets/pictures/Workoutbuilder.png"
import PDFexport from "/src/assets/pictures/PDFexport.png"

function Features() {
    useBackground("features-background")
    const [selectedImage, setSelectedImage] = useState(Workoutbuilder)

    const images = {
        feature1: exerciseFinder,
        feature2: Workoutbuilder,
        feature3: PDFexport
    }

    const handleClick = (feature) => {
        setSelectedImage(images[feature]);
    }

    return (
        <>
            <div className="outer-container-wrapper-features">
                <div className="inner-container-wrapper-features">
                    <h1>Features</h1>
                    <p className="feature-intro-text">Explore the features that make Workout Flow unique and powerful.</p>
                    <div className="features-wrapper">
                        <div className="feature-item"
                             onClick={() => handleClick("feature3")}
                             tabIndex="0"
                             role="button"
                             aria-label="Export Workouts to PDF, CSV, and JSON"
                        >
                            <h3>Export Workouts to PDF, CSV, and JSON</h3>
                            <p>
                                Easily save and share your workouts by exporting them in multiple formats. Download your
                                routines as PDF for printing, CSV for spreadsheets, or JSON for data management.
                            </p>
                        </div>
                        <div className="feature-item"
                             onClick={() => handleClick("feature1")}
                             tabIndex="0"
                             role="button"
                             aria-label="Interactive Exercise Library"
                        >
                            <h3>Interactive Exercise Library</h3>
                            <p>
                                Browse a wide range of exercises with detailed instructions and demo videos. Find the
                                perfect exercises to match your workout plan.
                            </p>
                        </div>
                        <div className="feature-item"
                             onClick={() => handleClick("feature2")}
                             tabIndex="0"
                             role="button"
                             aria-label="Progress Tracking & Workout History"
                        >
                            <h3>Progress Tracking & Workout History</h3>
                            <p>
                                Keep track of your completed workouts and monitor your progress over time. Stay
                                motivated with detailed workout history and performance insights.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="image-wrapper">
                    <img
                        src={selectedImage}
                        alt="WorkoutFlow Feature Screenshot"
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    );
}

export default Features;