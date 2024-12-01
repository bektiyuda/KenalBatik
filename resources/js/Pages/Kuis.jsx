import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { usePage } from "@inertiajs/react";
import profil from "../Assets/profil.svg";
import CircularProgressBar from "../Components/CircularProgressBar";

function Kuis() {
    const { props } = usePage();
    const quizData = props.quizzes || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    // Hitung akurasi
    // const accuracy =
    //     questionsAnswered > 0
    //         ? Math.round((correctAnswers / questionsAnswered) * 100)
    //         : 0;

    useEffect(() => {
        console.log(quizData);
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
            // fetchUserProfile(token); // Panggil fungsi untuk memuat profil
        }
    }, []);

    // const fetchUserProfile = async (token) => {
    //     try {
    //         const response = await axios.get("/api/users/profile", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`, // Kirim token sebagai header Authorization
    //             },
    //         });
    //         setUserData(response.data.data);
    //         // Set data pengguna dari respons API
    //     } catch (error) {
    //         console.error("Error fetching user profile:", error);
    //     }
    // };

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
        setUserData(null); // Hapus data pengguna setelah logout
        localStorage.removeItem("authToken"); // Hapus token dari localStorage
        window.location.reload(); // Refresh page setelah logout
    };

    const handleLogin = (token) => {
        localStorage.setItem("authToken", token); // Simpan token ke localStorage
        setIsLoggedIn(true);
        fetchUserProfile(token); // Ambil data pengguna setelah login
        setIsLoginOpen(false);
    };

    // useEffect(() => {
    //     const fetchQuizData = async () => {
    //         try {
    //             const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    //             if (!token) {
    //                 console.error("No token found. Please log in.");
    //                 return;
    //             }

    //             const response = await axios.get("/api/quizzes", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`, // Kirim token dalam header Authorization
    //                 },
    //             });
    //             setQuizData(response.data.data);
    //         } catch (error) {
    //             console.error("Error fetching quiz data:", error);
    //         }
    //     };
    //     fetchQuizData();
    // }, []);

    // Fungsi untuk menghitung waktu mundur
    useEffect(() => {
        if (timeLeft === 0) {
            setIsQuizCompleted(true); // Ketika waktu habis, tampilkan hasil kuis
        }

        const timer =
            timeLeft > 0 &&
            !isQuizCompleted &&
            setInterval(() => setTimeLeft(timeLeft - 1), 1000);

        return () => clearInterval(timer); // Bersihkan interval saat komponen dibongkar atau waktu habis
    }, [timeLeft, isQuizCompleted]);

    // Format waktu ke dalam bentuk MM:SS
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

    // const checkQuizAnswers = async (answers) => {
    //     const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    //     if (!token) {
    //         console.error("No token found. Please log in.");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             "api/quizzes/check",
    //             {
    //                 quiz_id: answers.map((answer) => answer.quiz_id),
    //                 user_answer: answers.map((answer) => answer.user_answer),
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`, // Kirim token dalam header Authorization
    //                 },
    //             }
    //         );

    //         setresponse.data(response.data.data);
    //         console.log(response.data.data);
    //     } catch (error) {
    //         console.error("Error checking quiz answers:", error);
    //     }
    // };

    const submitAnswers = (answers) => {
        const payload = {
            QuizID: answers.map((answer) => answer.quiz_id),
            UserAnswer: answers.map((answer) => answer.user_answer),
        };

        axios
            .post("/check-answer", payload)
            .then((response) => {
                const data = response.data;

                // Lakukan sesuatu dengan data
                console.log("Gunakan data langsung:", data.username);

                // Simpan ke state untuk kebutuhan render ulang
                setQuizResult(data);
            })
            .catch((error) => {
                console.error("Error submitting quiz answers:", error);
            });
    };


    return (
        <div className="w-full">
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
            <div className="">
                {!isQuizCompleted ? (
                    <div className="flex flex-col items-center justify-center lg:justify-start lg:mt-14 min-h-screen p-4  lg:mx-32 xl:mx-56">
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
                                                            ][
                                                                `option${option}` // Sesuaikan dengan struktur data seeder
                                                            ]
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
                                            (quizResult?.current_correct_answer /
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
                                            Banyak Soal
                                        </p>
                                        <p className="text-start text-4xl md:text-5xl">
                                            5
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

                            {/* Right Section (Text Content) */}
                            <div className="basis-full lg:basis-1/2 flex flex-col my-10 lg:items-start">
                                <p className="text-4xl md:text-5xl lg:text-7xl mb-3 font-vidaloka text-center lg:text-left">
                                    Kamu Sudah di Jalur yang Tepat!
                                </p>
                                <p className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                                    Pengetahuanmu tentang batik sudah luar
                                    biasa. Dengan sedikit usaha lagi, kamu bisa
                                    jadi ahli!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Kuis;
