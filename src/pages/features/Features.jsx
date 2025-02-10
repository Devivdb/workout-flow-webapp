import './Features.css'
import useBackground from "../../../../workout-flow-webapp/src/hooks/useBackground.js";
import featureOne from "../../../../workout-flow-webapp/src/assets/pictures/featureOne.png"
import featureTwo from "../../../../workout-flow-webapp/src/assets/pictures/featureTwo.png"
import {useState} from "react";

function Features() {

    useBackground("features-background")
    const [selectedImage, setSelectedImage] = useState(featureOne)

    useBackground("features-background")

    const images = {
        feature1: featureOne,
        feature2: featureTwo,
    }

    const handleClick = (feature) => {
        setSelectedImage(images[feature]);
    }

    return (
        <>
            <div className="outer-container-wrapper-features">
                <div className="inner-container-wrapper-features">
                    <h1>Features</h1>
                    <p className="feature-intro-text">Explore the features that make Pumpd unique and powerful.</p>
                    <div className="features-wrapper">
                        <div className="feature-item"
                             onClick={() => handleClick("feature1")}
                        >
                            <h3>Export Workouts to PDF, CSV, and JSON</h3>
                            <p>
                                Easily save and share your workouts by exporting them in multiple formats. Download your
                                routines as PDF for printing, CSV for spreadsheets, or JSON for data management.
                            </p>
                        </div>
                        <div className="feature-item"
                             onClick={() => handleClick("feature2")}
                        >
                            <h3>Progress Tracking & Workout History</h3>
                            <p>
                                Keep track of your completed workouts and monitor your progress over time. Stay
                                motivated with detailed workout history and performance insights.
                            </p>
                        </div>
                        <div className="feature-item"
                             onClick={() => handleClick("feature1")}
                        >
                            <h3>Interactive Exercise Library</h3>
                            <p>
                                Browse a wide range of exercises with detailed instructions and demo videos. Find the
                                perfect exercises to match your workout plan.
                            </p>
                        </div>
                    </div>
                </div>
                <span className="image-wrapper">
                    <img src={selectedImage} alt="Features"/>
                </span>
            </div>

        </>
    );
};

export default Features;