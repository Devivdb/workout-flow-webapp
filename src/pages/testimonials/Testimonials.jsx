import './Testimonials.css'
import useBackground from "../../../../workout-flow-webapp/src/hooks/useBackground.js";
import ReviewBlock from "../../components/ui/reviewBlock/ReviewBlock.jsx";


function Testimonials(){
    useBackground("testimonials-background")

    return (
        <div className="testimonials-background">
            <div className="intro-text-testimonials">
                <h1>What users are saying</h1>
                <p>Still not convinced? See what our users love about WorkoutFlow:</p>
            </div>
            <ReviewBlock />
        </div>
    );
}

export default Testimonials;