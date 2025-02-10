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
        <>
            <div className="intro-home-page">
                <h1 className="intro-text-home-page">WORKOUT BUILDER</h1>
                <p className="intro-text">
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution.
                </p>
                <button type="button" className="generate-button" onClick={handleButtonClick}>GENERATE YOUR WORKOUT</button>
            </div>
        </>
    );
}

export default Home;