import './Home.css'
import useBackground from "../../hooks/useBackground.js";

function Home() {

    useBackground("home-background");

    return (
        <>
            <div className="intro-home-page">
                <h1 className="intro-text-home-page">WORKOUT BUILDER</h1>
                <p className="intro-text">
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution.
                </p>
                <button type="button" className="generate-button">GENERATE YOUR WORKOUT</button>
            </div>
        </>
    );
}

export default Home;