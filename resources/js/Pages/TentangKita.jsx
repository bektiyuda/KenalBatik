import Navbar from "../Components/Navbar";
import LoginPopup from "../Components/auth/LoginPopup";
import SignUpPopup from "../Components/auth/SignUpPopup";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ppnaufal from "../Assets/ppnaufal.png";
import pprendra from "../Assets/pprendra.png";
import ppwildan from "../Assets/ppwildan.png";
import Footer from "../Sections/Footer";
import ppbekti from "../Assets/ppbekti.png";

const TentangKita = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
            fetchUserProfile(token);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

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

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    const handleLogin = (token) => {
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true);
        fetchUserProfile(token);
        setIsLoginOpen(false);
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

    return (
        <div className="max-w-full md:h-screen relative flex flex-col">
            <div className="w-full fixed z-50">
                <Navbar
                    onLoginClick={toggleLoginPopup}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                    userData={userData}
                />
            </div>
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

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={quotesVariant}
                className="w-full pt-20 md:h-full md:px-20 my-10 lg:my-24 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-12 lg:gap-32 text-center font-vidaloka"
            >
                <div className="flex flex-col items-center">
                    <img
                        src={ppwildan}
                        alt="wildan"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Muhammad Wildan Zhafiri</p>
                    <p className="text-lg">Front-end Developer</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={pprendra}
                        alt="rendra"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Rarendra Adi Prabowo</p>
                    <p className="text-lg">Web Design</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={ppnaufal}
                        alt="naufal"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Naufal Haris Rusyard</p>
                    <p className="text-lg">Back-end Developer</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={ppbekti}
                        alt="bekti"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Bekti Yuda Adi Pratama</p>
                    <p className="text-lg">Back-end Developer</p>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default TentangKita;
