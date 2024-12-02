import React, { useEffect, useState } from "react";
import tier from "../assets/Tier 5.svg";
import profil from "../assets/profil.svg";
import { usePage, router } from "@inertiajs/react";

const Profil = ({ onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading
    const [isVisible, setIsVisible] = useState(false); // Untuk animasi smooth

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("/profile"); // Panggil API
                setUserData(response.data); // Simpan data di state
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setIsLoading(false); // Set loading selesai
                setTimeout(() => setIsVisible(true), 100); // Tambahkan delay untuk smooth animation
            }
        };

        fetchUserProfile();
    }, []);

    // Hitung akurasi
    const totalQuiz = parseInt(userData?.total_quiz || 0);
    const totalCorrectAnswer = parseInt(userData?.total_correct_answer || 0);
    const accuracy =
        totalQuiz > 0 ? ((totalCorrectAnswer / totalQuiz) * 100) : 0;

    const handleLogout = () => {
        router.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    console.log("Berhasil logout");
                    onLogout();
                },
                onError: (errors) => {
                    console.error("Error saat logout:", errors);
                },
            }
        );
    };

    const progressWidth =
        userData?.user_experience && userData?.exp_to_next_tier
            ? (userData?.user_experience / userData?.exp_to_next_tier) * 100
            : 0;

    return (
        <div
            className={`absolute right-0 mt-2 w-[280px] sm:w-[350px] md:w-[450px] bg-white shadow-lg rounded-lg z-50 p-3 sm:p-4 md:p-5 transition-all duration-500 ease-in-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
            }`}
        >
            {isLoading ? (
                <div className="bg-gray-200 animate-pulse rounded-2xl p-3 sm:p-4 md:p-5">
                    <div className="flex items-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
                        <div className="ml-3 flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="mt-4 h-3 bg-gray-300 rounded w-full"></div>
                </div>
            ) : (
                <>
                    <div className="bg-[#ffdfad] rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-2">
                        <div className="w-full sm:basis-4/5">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-2 sm:mb-0">
                                    <img
                                        src={profil}
                                        alt="Profile"
                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-2 sm:mb-0 sm:mr-3"
                                    />
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold text-black">
                                            {userData?.username || "Guest"}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-black">
                                            {userData?.email || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-xs sm:text-sm mr-2 text-black">{`${
                                    userData?.user_experience || 0
                                } / ${userData?.exp_to_next_tier || 0}`}</span>
                                <div className="flex-1 ml-2">
                                    <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                                        <div
                                            className="bg-[#37b991] h-3 sm:h-4 rounded-full"
                                            style={{
                                                width: `${progressWidth}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:basis-1/5 flex justify-center items-center sm:items-end mt-2 sm:mt-0">
                            <img
                                src={userData?.tier_photo_link}
                                alt="Tier Badge"
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                            />
                        </div>
                    </div>
                    <div className="mt-3 bg-[#ffdfad] grid grid-cols-3 p-3 rounded-2xl text-center">
                        <div className="text-black">
                            <p className="text-xs sm:text-sm">Soal Terjawab</p>
                            <p className="text-lg md:text-2xl font-semibold">
                                {totalQuiz}
                            </p>
                        </div>
                        <div className="text-black">
                            <p className="text-xs sm:text-sm">Jawaban Benar</p>
                            <p className="text-lg md:text-2xl font-semibold">
                                {totalCorrectAnswer}
                            </p>
                        </div>
                        <div className="text-black">
                            <p className="text-xs sm:text-sm">
                                Akurasi Jawaban
                            </p>
                            <p className="text-lg md:text-2xl font-semibold">
                                {accuracy}%
                            </p>
                        </div>
                    </div>

                    {userData?.is_admin === 1 && (
                        <button
                            onClick={() =>
                                (window.location.href = "/admin/batik")
                            }
                            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg w-full transition duration-300 ease-in-out hover:bg-blue-700"
                        >
                            Dashboard Admin
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 mt-3 rounded-lg w-full transition duration-300 ease-in-out hover:bg-red-600"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default Profil;
