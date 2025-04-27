import './App.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/home/Home.jsx";
import Features from "./pages/features/Features.jsx";
import Testimonials from "./pages/testimonials/Testimonials.jsx";
import Highlights from "./pages/highlights/Highlights.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Faq from "./pages/faq/Faq.jsx";
import LogIn from "./pages/logIn/LogIn.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import WorkoutBuilder1 from "./pages/workoutBuilder/WorkoutBuilder1.jsx";
import Search from "./pages/search/Search.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Header from "./components/ui/header/Header.jsx";
import Footer from "./components/ui/footer/Footer.jsx";

function App() {
    return (
        <AuthProvider>
            <Header/>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="/features" element={<Features/>}/>
                <Route path="/testimonials" element={<Testimonials/>}/>
                <Route path="/highlights" element={<Highlights/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/workout-builder" element={<WorkoutBuilder1/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
            <Footer/>
        </AuthProvider>
    )
}

export default App