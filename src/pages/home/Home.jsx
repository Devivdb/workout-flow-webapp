import './Home.css'
import useBackground from "../../hooks/useBackground.js";
import {useNavigate} from "react-router-dom";

function Home() {

    useBackground("home-background");

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/workout-builder")
    }

    return (
        <div className="home-background">
            <div className="intro-home-page">
                <h1 className="intro-text-home-page">WORKOUT BUILDER</h1>
                <p className="intro-text">
                    Design your perfect workout routine with our powerful muscle-targeting system. Customize exercises, sets, and reps to match your fitness goals and see real results. Start building your ideal workout today!
                </p>
                <button type="button" className="generate-button" onClick={handleButtonClick}>GENERATE YOUR WORKOUT</button>
            </div>
        </div>
    )
}

export default Home;