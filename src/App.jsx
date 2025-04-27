import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthContext";
import useAuth from "./hooks/useAuth";
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
import PublicHeader from "./components/ui/header/Public/PublicHeader.jsx"
import ProtectedHeader from "./components/ui/header/Protected/ProtectedHeader.jsx"
import Footer from "./components/ui/footer/Footer.jsx";

function AppContent() {
    const { isAuth } = useAuth();
    const location = useLocation();

    // Define protected route patterns
    const protectedRoutePatterns = [
        '/workout-builder',
        '/search',
        '/profile'
    ];

    // Check if the current path starts with any protected route pattern
    const isProtectedRoute = protectedRoutePatterns.some(pattern =>
        location.pathname === pattern || location.pathname.startsWith(`${pattern}/`)
    );

    // Determine layout based on authentication and route
    const useProtectedLayout = isAuth && isProtectedRoute;

    return (
        <div className={useProtectedLayout ? 'app-with-sidebar' : 'app-standard'}>
            {useProtectedLayout ? <ProtectedHeader /> : <PublicHeader />}

            <main className={useProtectedLayout ? 'content-with-sidebar' : 'content-standard'}>
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
                        <Route path="/workout-builder/*" element={<WorkoutBuilder1/>}/>
                        <Route path="/search/*" element={<Search/>}/>
                        <Route path="/profile/*" element={<Profile/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </main>
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App