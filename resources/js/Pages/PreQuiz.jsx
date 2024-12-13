import { usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import quizCard1 from "../Assets/quizcard1.png";
import quizCard2 from "../Assets/quizcard2.png";
import quizCard3 from "../Assets/quizcard3.png";
import mainImage from "../Assets/imgprequiz.png";
import { useState, useEffect } from "react";
import axios from "axios";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";

const PreQuiz = () => {
    const { auth } = usePage().props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); 
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    

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

    const handleQuizClick = () => {
        const token = auth.user;

        if (!token) {
            alert("Anda harus login untuk mengakses kuis.");
            setIsLoginOpen(true);
            return;
        }

        window.location.href = "/kuis";
    };

    return (
        <section className="overflow-hidden">
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
            <div className="mx-8 md:mx-14 lg:mx-20 py-8 md:py-14">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between md:gap-10 lg:gap-20 font-vidaloka">
                    {/* Gambar Utama */}
                    <div className="relative mb-8 md:mb-0 max-w-full">
                        <img
                            src={mainImage}
                            alt="Main Image"
                            className="w-[400px] md:w-[500px] lg:w-full object-cover max-w-full"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
                            <img
                                src={quizCard1}
                                alt="Quiz Card 1"
                                className="w-[220px] md:w-[230px] lg:w-[320px] absolute -top-5 -left-7 max-w-full"
                            />
                            <img
                                src={quizCard2}
                                alt="Quiz Card 2"
                                className="w-[220px] md:w-[230px] lg:w-[320px] absolute bottom-20 lg:bottom-24 lg:-right-16 -right-5 max-w-full"
                            />
                            <img
                                src={quizCard3}
                                alt="Quiz Card 3"
                                className="w-[250px] md:w-[250px] lg:w-[350px] absolute -bottom-4 lg:-bottom-10 -left-5 max-w-full"
                            />
                        </div>
                    </div>

                    {/* Teks Utama */}
                    <div className="text-center md:text-left md:w-2/3">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Seberapa Kenal Kamu dengan Batik Nusantara?
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 md:mt-7">
                                <div className="bg-white h-10 w-10 border-4 border-[#E4676C] rounded-full items-center justify-center flex">
                                    1
                                </div>
                                <p className="w-4/5 lg:text-xl text-start">
                                    Uji pengetahuanmu tentang sejarah, makna,
                                    dan motif batik dari berbagai daerah di
                                    Indonesia.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white h-10 w-10 border-4 border-[#E4676C] rounded-full items-center justify-center flex">
                                    2
                                </div>
                                <p className="w-4/5 lg:text-xl text-start">
                                    Hanya butuh 5 menit untuk menemukan seberapa
                                    dalam pengetahuanmu tentang warisan budaya
                                    ini.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleQuizClick}
                            className="bg-[#E4676C] hover:bg-red-500 duration-300 mt-6 md:mt-10 px-5 py-2 font-sofiasans lg:text-lg text-white rounded-xl"
                        >
                            Mulai Kuis
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreQuiz;
