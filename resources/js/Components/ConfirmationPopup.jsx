import React from "react";
import LoginPopup from "../Components/auth/LoginPopup";
import SignUpPopup from "../Components/auth/SignUpPopup";
import ForgotPasswordPopUp from "../Components/auth/ForgotPasswordPopup";
import { useState } from "react";

const ConfirmationPopup = ({ onClose }) => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const handleLoginClick = () => {
        setShowLoginPopup(true); // Tampilkan komponen LoginPopup
    };

    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false); // Sembunyikan komponen LoginPopup
    };

    const toggleSignUpPopup = () => {
        setIsSignUpOpen(!isSignUpOpen);
        setIsLoginOpen(false);
    };

    const toggleForgotPasswordPopup = () => {
        setIsForgotPasswordOpen(!isForgotPasswordOpen);
        setIsLoginOpen(false);
    };

    const handleLogin = () => {
        setShowLoginPopup(false);
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:w-[400px] mx-4">
                <h2 className="text-center text-xl font-bold mb-4 font-vidaloka">
                    Konfirmasi
                </h2>
                <p className="text-start text-black mb-6">
                    Kamu Harus masuk atau daftar akun dulu sebelum menggunakan
                    fitur kuis!
                </p>
                <div className="flex justify-center gap-10">
                    <button
                        onClick={onClose}
                        className="border bg-[#e4666c] text-white px-6 py-2 rounded-lg"
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleLoginClick}
                        className="border bg-[#1c95d2] text-white px-6 py-2 rounded-lg"
                    >
                        Masuk
                    </button>
                </div>
            </div>
            {showLoginPopup && (
                <LoginPopup
                    onClose={handleCloseLoginPopup}
                    onSignUpClick={toggleSignUpPopup}
                    onForgotPasswordClick={toggleForgotPasswordPopup}
                    onLogin={handleLogin}
                />
            )}
            {isSignUpOpen && <SignUpPopup onClose={toggleSignUpPopup} />}
            {isForgotPasswordOpen && (
                <ForgotPasswordPopUp onClose={toggleForgotPasswordPopup} />
            )}
        </div>
    );
};

export default ConfirmationPopup;
