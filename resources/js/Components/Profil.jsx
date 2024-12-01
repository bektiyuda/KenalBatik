import React from "react";
import tier from "../assets/Tier 5.svg";
import profil from "../assets/profil.svg";
import { usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Profil = ({ onLogout }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("/profile"); // Panggil API
                console.log(response);
                setUserData(response.data); // Simpan data di state
                setLoading(false);
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);
    // Hitung akurasi
    const totalQuiz = parseInt(userData?.total_quiz || 0);
    const totalCorrectAnswer = parseInt(userData?.total_correct_answer || 0);
    const accuracy =
        totalQuiz > 0 ? ((totalCorrectAnswer / totalQuiz) * 100).toFixed(2) : 0;

    const handleLogout = () => {
        router.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    console.log("Berhasil logout");
                    onLogout(); // Update state di parent jika diperlukan
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
        <div className="absolute right-0 mt-2 w-[280px] sm:w-[350px] md:w-[450px] bg-white shadow-lg rounded-lg z-50 p-3 sm:p-4 md:p-5">
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
                                <h2 className="text-base sm:text-lg font-bold text-black">
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
                                    style={{ width: `${progressWidth}%` }}
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
                <div>
                    <p className="text-xs sm:text-sm">Soal Terjawab</p>
                    <p className="text-lg font-bold">{totalQuiz}</p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm">Jawaban Benar</p>
                    <p className="text-lg font-bold">{totalCorrectAnswer}</p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm">Akurasi Jawaban</p>
                    <p className="text-lg font-bold">{accuracy}%</p>
                </div>
            </div>

            {userData?.is_admin === 1 && (
                <button
                    onClick={() => (window.location.href = "/admin/batik")}
                    className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg w-full"
                >
                    Dashboard Admin
                </button>
            )}

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded-lg w-full"
            >
                Logout
            </button>
        </div>
    );
};

export default Profil;
