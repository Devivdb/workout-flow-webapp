import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Features from "./pages/features/Features.jsx";
import Testimonials from "./pages/testimonials/Testimonials.jsx";
import Highlights from "./pages/highlights/Highlights.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Faq from "./pages/faq/Faq.jsx";
import LogIn from "./pages/logIn/LogIn.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import WorkoutBuilder from "./pages/workoutBuilder/WorkoutBuilder.jsx";
import Search from "./pages/search/Search.jsx";
import Header from "./components/ui/header/Header.jsx";
import Footer from "./components/ui/footer/Footer.jsx";

function App() {


    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/features" element={<Features/>}/>
                <Route path="/testimonials" element={<Testimonials/>}/>
                <Route path="/highlights" element={<Highlights/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
                <Route path="/sign-Up" element={<SignUp/>}/>
                <Route path="/workout-builder" element={<WorkoutBuilder/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default App
