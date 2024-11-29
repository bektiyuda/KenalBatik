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
import ppbekti from "../Assets/ppbekti.png" 

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
        <div className="max-w-full md:h-screen   flex flex-col">
            <Navbar
                onLoginClick={toggleLoginPopup}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                userData={userData}
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

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={quotesVariant}
                className="w-full md:h-full my-10 lg:my-24 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-32 text-center font-vidaloka"
            >
                <div className="flex flex-col items-center">
                    <img
                        src={ppwildan}
                        alt="wildan"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl  mt-5">Wildan Zhafiri</p>
                    <p className="text-lg">Front-end Developer</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={pprendra}
                        width={170}
                        height={170}
                        alt="rendra"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Rarendra Adi</p>
                    <p className="text-lg">Web Design</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={ppnaufal}
                        width={170}
                        height={170}
                        alt="naufal"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Naufal Haris</p>
                    <p className="text-lg">Back-end Developer</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={ppbekti}
                        width={170}
                        height={170}
                        alt="naufal"
                        className="w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-full"
                    />
                    <p className="text-2xl mt-5">Naufal Haris</p>
                    <p className="text-lg">Back-end Developer</p>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default TentangKita;
