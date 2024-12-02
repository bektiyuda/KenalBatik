import { useState, useRef, useEffect } from "react";
import Hero from "../Sections/Hero";
import { router, usePage } from "@inertiajs/react";
import SectionQuotes from "../Sections/SectionQuotes.jsx";
import Footer from "../Sections/Footer.jsx";
import LoginPopup from "../Components/auth/LoginPopup.jsx";
import SignUpPopup from "../Components/auth/SignUpPopup.jsx";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup.jsx";
import ConfirmationPopup from "../Components/ConfirmationPopup.jsx";
import Peta from "../sections/Peta.jsx";
import IntroQuiz from "../Sections/IntroQuiz.jsx";
import Navbar from "../Components/Navbar.jsx";
import Timeline from "../Sections/Timeline.jsx";
import { motion } from "framer-motion";

function Homepage({ batiks }) {

    const { props } = usePage(); // Ambil props dari Inertia
    const { authToken, user } = props;


    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const toggleLoginPopup = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const toggleSignUpPopup = () => {
        setIsSignUpOpen(!isSignUpOpen);
        setIsLoginOpen(false);
    };

    const toggleForgotPasswordPopup = () => {
        setIsForgotPasswordOpen(!isForgotPasswordOpen);
        setIsLoginOpen(false);
    };

    const toggleConfirmationPopup = () => {
        setIsConfirmationOpen(!isConfirmationOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
          
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null); // Hapus data pengguna setelah logout
        localStorage.removeItem("authToken"); // Hapus token dari localStorage
        window.location.reload(); // Refresh page setelah logout
    };

    const handleLogin = (token) => {
        localStorage.setItem("authToken", token);
        console.log(token);
        setIsLoggedIn(true);
        // fetchUserProfile(token);
        setIsLoginOpen(false);
    };

    // const fetchUserProfile = () => {
    //     router.get(
    //         "/profile",
    //         {},
    //         {
    //             onSuccess: ({ props }) => {
    //                 setUserData(props.response); // Pastikan response sesuai
    //             },
    //             onError: (errors) => {
    //                 console.error("Error fetching profile:", errors);
    //             },
    //         }
    //     );
    // };

    const sectionQuotesRef = useRef(null);

    const scrollToSectionQuotes = () => {
        sectionQuotesRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    };

    // Slide-in variants for animations (from left or right)
    const slideInFromRight = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
            },
        },
    };

    const slideInFromLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
            },
        },
    };

    const quotesVariant = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
            },
        },
    };

    useEffect(() => {
        console.log("Auth Token:", authToken);
        console.log("User Data:", user);
    }, [authToken, user]);

    return (
        <div className="overflow-hidden relative">
            <div className="w-full fixed z-50">

            <Navbar
                onLoginClick={toggleLoginPopup}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                userData={userData}
            />
            </div>
            {/* Hero Section - Sliding in from left */}
            <Hero
                onExploreClick={scrollToSectionQuotes}
                isLoggedIn={isLoggedIn}
            />
            {isLoginOpen && (
                <LoginPopup
                    onClose={toggleLoginPopup}
                    onLogin={handleLogin}
                    onSignUpClick={toggleSignUpPopup}
                    onForgotPasswordClick={toggleForgotPasswordPopup}
                />
            )}
            {isSignUpOpen && <SignUpPopup onClose={toggleSignUpPopup} />}
            {isForgotPasswordOpen && (
                <ForgotPasswordPopup onClose={toggleForgotPasswordPopup} />
            )}
            {isConfirmationOpen && (
                <ConfirmationPopup onClose={toggleConfirmationPopup} />
            )}
            {/* Section Quotes - Sliding in from right */}
            <motion.div
                ref={sectionQuotesRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={quotesVariant}
            >
                <SectionQuotes />
            </motion.div>
            {/* Peta Section - Sliding in from left */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={slideInFromLeft}
            >
                <Peta batiks={batiks} />
            </motion.div>
            {/* Timeline Section - Sliding in from right */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={slideInFromRight}
            >
                <Timeline />
            </motion.div>
            {/* Intro Quiz Section - Sliding in from left */}
            <IntroQuiz isLoggedIn={isLoggedIn} />
            <Footer />
        </div>
    );
}

export default Homepage;
