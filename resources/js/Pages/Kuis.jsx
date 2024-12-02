import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { usePage } from "@inertiajs/react";
import profil from "../Assets/profil.svg";
import CircularProgressBar from "../Components/CircularProgressBar";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";

function Kuis() {
    const { props } = usePage();
    const quizData = props.quizzes || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(1 * 60);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);


    useEffect(() => {
        console.log(quizData);
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

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

    useEffect(() => {
        if (timeLeft === 0 && !isQuizCompleted) {
            // Set flag quiz selesai
            setIsQuizCompleted(true);

            // Kirim jawaban pengguna
            submitAnswers(userAnswers);
        }

        const timer =
            timeLeft > 0 &&
            !isQuizCompleted &&
            setInterval(() => setTimeLeft(timeLeft - 1), 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isQuizCompleted, userAnswers]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };

    const handleAnswerClick = (selectedAnswer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = {
            quiz_id: quizData[currentQuestion].id,
            user_answer: selectedAnswer,
        };
        setUserAnswers(updatedAnswers);

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsQuizCompleted(true);
            submitAnswers(updatedAnswers);
        }
    };

    const submitAnswers = (answers) => {
        const filledAnswers = quizData.map((quiz, index) => {
            return (
                answers[index] || {
                    quiz_id: quiz.id,
                    user_answer: null, // Jawaban kosong jika pengguna tidak menjawab
                }
            );
        });

        const payload = {
            QuizID: filledAnswers.map((answer) => answer.quiz_id),
            UserAnswer: filledAnswers.map((answer) => answer.user_answer),
        };

        axios
            .post("/check-answer", payload)
            .then((response) => {
                const data = response.data;

                setQuizResult(data);
                setTimeout(() => {
                    setIsCheckingAnswers(false); // Sembunyikan loading
                }, 2000);
            })
            .catch((error) => {
                console.error("Error submitting quiz answers:", error);
                setIsCheckingAnswers(false); // Sembunyikan loading jika gagal
            });
    };

    const getAnsweredQuestionsCount = () => {
        return userAnswers.filter(
            (answer) => answer && answer.user_answer !== null
        ).length;
    };



    return (
        <div className="w-full relative">
            <div className="w-full fixed top-0 z-50">
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

            <div className="lg:pt-14 pt-28">
                {!isQuizCompleted && !isCheckingAnswers ? (
                    <div className="flex flex-col items-center justify-start lg:mt-14 min-h-screen p-4 lg:mx-32 xl:mx-56">
                        <div className="px-7 shadow-2xl mb-3 md:mb-5 md:text-xl lg:text-2xl py-2 bg-[#fef1e2] rounded-3xl">
                            sesi kuis
                        </div>
                        <p className="text-lg md:text-2xl text-center mb-3 md:mb-5">
                            {formatTime(timeLeft)}
                        </p>
                        {quizData.length > 0 && (
                            <div className="w-full mx-auto shadow-xl p-6 flex flex-col lg:flex-row gap-10 justify-between rounded-3xl lg:items-start bg-[#f6f2ed]">
                                {/* Bagian Pertanyaan */}
                                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
                                    <div className="flex justify-between w-full mb-4 md:text-xl lg:text-2xl">
                                        <span>
                                            {currentQuestion + 1}/
                                            {quizData.length}
                                        </span>
                                        <span>
                                            Pertanyaan {currentQuestion + 1}
                                        </span>
                                    </div>
                                    <div className="w-full border-[0.5px] border-black/50 mb-4"></div>

                                    <h2 className="font-vidaloka tracking-wider text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                                        {quizData[currentQuestion].question}
                                    </h2>
                                </div>

                                {/* Bagian Jawaban */}
                                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                                    <div className="grid grid-cols-1 gap-4 w-full">
                                        {quizData[currentQuestion] ? (
                                            ["A", "B", "C", "D"].map(
                                                (option) => (
                                                    <button
                                                        key={option}
                                                        className={`font-vidaloka border border-[#f8a071] rounded-full text-lg md:text-2xl lg:text-4xl py-2 px-4 w-full bg-[#f8a071]/30 hover:bg-[#f8a071]/50 transition duration-300 ease-in-out ${
                                                            userAnswers[
                                                                currentQuestion
                                                            ]?.user_answer ===
                                                            option
                                                                ? "bg-[#37B991]"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleAnswerClick(
                                                                option
                                                            )
                                                        }
                                                    >
                                                        {
                                                            quizData[
                                                                currentQuestion
                                                            ][`option${option}`]
                                                        }
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <p>
                                                Data pilihan jawaban tidak
                                                tersedia.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : isCheckingAnswers ? (
                    // Animasi Loading
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <div className="text-2xl font-bold mb-4">
                            Memeriksa jawaban...
                        </div>
                        <div className="w-16 h-16 border-4 border-t-[#f8a071] border-gray-200 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="w-full mt-20">
                        <div className="flex flex-col mx-4 md:mx-10 lg:flex-row lg:mx-32 lg:gap-16">
                            {/* Left Section (Profile and Progress) */}
                            <div className="flex flex-col basis-full lg:basis-1/2 mb-10 lg:mb-0">
                                <div className="flex flex-col justify-center bg-[#FFDFAD61] p-7 rounded-3xl">
                                    <div className="flex flex-col justify-center items-center">
                                        <img
                                            src={profil}
                                            alt="User Avatar"
                                            className="w-24 h-24 rounded-full border-4 border-white"
                                        />
                                        <h2 className="text-3xl font-bold mt-3 mb-6">
                                            {quizResult?.username}
                                        </h2>
                                    </div>

                                    <CircularProgressBar
                                        accuracy={
                                            isNaN(
                                                (quizResult?.current_correct_answer /
                                                    5) *
                                                    100
                                            )
                                                ? 0
                                                : (quizResult?.current_correct_answer /
                                                      5) *
                                                  100
                                        }
                                    />

                                    <div className="flex flex-col items-center mt-6 w-full">
                                        <div className="flex flex-row items-center gap-2 md:gap-0 w-full">
                                            <div className="basis-4/5">
                                                <p className="font-semibold text-end text-lg lg:text-2xl">
                                                    {quizResult?.user_tier}
                                                </p>
                                                <div className="w-full flex items-center justify-between">
                                                    {/* Experience text */}
                                                    <p className="mr-4 text-lg lg:text-2xl  whitespace-nowrap">
                                                        {
                                                            quizResult?.user_experience
                                                        }{" "}
                                                        /{" "}
                                                        {
                                                            quizResult?.exp_to_next_tier
                                                        }
                                                    </p>

                                                    {/* Progress bar */}
                                                    <div className="w-full bg-[#D9D9D9] rounded-full h-4">
                                                        <div
                                                            className="h-4 bg-green-500 rounded-full"
                                                            style={{
                                                                width: `${
                                                                    (quizResult?.user_experience /
                                                                        quizResult?.exp_to_next_tier) *
                                                                    100
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full basis-1/5 flex justify-center items-center sm:items-end">
                                                <img
                                                    src={
                                                        quizResult?.tier_photo_link
                                                    }
                                                    alt="Batik Pemula"
                                                    className="w-16 h-16 md:w-20 md:h-20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Stats Section */}
                                <div className="flex justify-around w-full mt-10 gap-6 bg-[#FFDFAD61] lg:mb-16 rounded-3xl p-7 font-vidaloka">
                                    <div className="text-center">
                                        <p className="text-base md:text-lg text-start font-semibold mb-2">
                                            Soal Terjawab
                                        </p>
                                        <p className="text-start text-4xl md:text-5xl">
                                            {getAnsweredQuestionsCount()}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-base md:text-lg text-start font-semibold mb-2">
                                            Jawaban Benar
                                        </p>
                                        <p className="text-start text-4xl md:text-5xl">
                                            {quizResult?.current_correct_answer}{" "}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-base md:text-lg text-start font-semibold mb-2">
                                            Akurasi Jawaban
                                        </p>
                                        <p className="text-start text-4xl md:text-5xl">
                                            {(quizResult?.current_correct_answer /
                                                5) *
                                                100}
                                            %
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Konten kanan */}
                            <div className="basis-full lg:basis-1/2 flex flex-col my-10 lg:items-start">
                                {(() => {
                                    const accuracy =
                                        (quizResult?.current_correct_answer /
                                            5) *
                                        100;

                                    if (accuracy <= 40) {
                                        return (
                                            <>
                                                <p className="text-4xl md:text-5xl lg:text-7xl mb-3 font-vidaloka text-center lg:text-left">
                                                    Langkah Awal yang Hebat!
                                                </p>
                                                <p className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                                                    Setiap perjalanan dimulai
                                                    dengan langkah pertama. Ayo
                                                    pelajari lebih banyak
                                                    tentang batik dan coba lagi!
                                                </p>
                                            </>
                                        );
                                    } else if (
                                        accuracy > 40 &&
                                        accuracy <= 60
                                    ) {
                                        return (
                                            <>
                                                <p className="text-4xl md:text-5xl lg:text-7xl mb-3 font-vidaloka text-center lg:text-left">
                                                    Kamu Sudah di Jalur yang
                                                    Tepat!
                                                </p>
                                                <p className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                                                    Pengetahuanmu tentang batik
                                                    sudah luar biasa. Dengan
                                                    sedikit usaha lagi, kamu
                                                    bisa jadi ahli!
                                                </p>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <p className="text-4xl md:text-5xl lg:text-7xl mb-3 font-vidaloka text-center lg:text-left">
                                                    Kamu Ahli Batik Sejati!
                                                </p>
                                                <p className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                                                    Pengetahuanmu tentang batik
                                                    sangat mengesankan. Teruslah
                                                    menjaga dan menginspirasi
                                                    kecintaanmu pada budaya
                                                    Indonesia!
                                                </p>
                                            </>
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Kuis;
