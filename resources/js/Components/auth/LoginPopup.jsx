import React, { useState } from "react";
import axios from "axios";
import sideImage from "../../assets/login-image.png";
import googleImage from "../../assets/Google Logo.svg";
import Logo from "../../assets/logo.svg";

const LoginPopup = ({
    onClose,
    onSignUpClick,
    onForgotPasswordClick,
    onLogin,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Untuk menampilkan error message jika login gagal

    // Function untuk login dengan Google OAuth
    const handleGoogleLogin = async () => {
        try {
            // Panggil API OAuth login untuk mendapatkan URL redirect
            const response = await axios.get("/api/users/oauth");

            // Dapatkan URL redirect dari response
            const redirectUrl = response.data.data.redirect_link;

            // Redirect pengguna ke URL yang dikembalikan oleh API
            window.location.href = redirectUrl;
        } catch (error) {
            console.error("Error during Google OAuth login:", error.message);
            setErrorMessage("Gagal mengarahkan ke Google untuk login.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/login", {
                email: email, // Sesuaikan field dengan apa yang diharapkan oleh API
                password: password,
            });

            // Jika berhasil login, simpan token ke local storage atau state
            const token = response.data.data.token;
            localStorage.setItem("token", response.data.data.token); // Simpan token ke local storage
            console.log(response.data.data.token);
            console.log(token);

            onLogin(token); // Trigger login success callback
            onClose(); // Tutup popup setelah login berhasil
        } catch (error) {
            // Jika terjadi error, tampilkan pesan error di UI
            console.error(
                "Login failed:",
                error.response ? error.response.data : error.message
            );
            setErrorMessage("Login gagal. Periksa email atau kata sandi Anda.");
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.id === "overlay") {
            onClose();
        }
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-[#f7f2ed] rounded-xl shadow-lg flex flex-col lg:flex-row w-[90%] max-w-[1200px] h-auto lg:h-[600px] transform transition-transform duration-300 ease-in-out scale-100 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200 z-50"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="w-full lg:w-[50%] p-8 relative flex flex-col justify-center items-center">
                    <img
                        src={Logo}
                        width={40}
                        height={40}
                        alt="Kenal Batik"
                        className="block mx-auto mb-4 sm:mb-8 sm:absolute sm:top-12 sm:left-10 lg:top-12 lg:left-12"
                    />
                    <div className="w-full max-w-[400px] mt-4 sm:mt-10">
                        <h2 className="text-xl font-semibold text-[#333]">
                            Masuk
                        </h2>
                        <p className="mb-6 text-gray-500 text-sm">
                            Masuk untuk melihat progress levelmu!
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-600 font-semibold mb-1">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    className="border border-gray-300 rounded-lg w-full py-2 px-3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-semibold mb-1">
                                    Kata Sandi
                                </label>
                                <input
                                    type="password"
                                    className="border border-gray-300 rounded-lg w-full py-2 px-3"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <p className="text-red-500">{errorMessage}</p>
                            )}

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={onForgotPasswordClick}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Lupa Kata Sandi?
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#092fb5] text-white py-4 px-4 w-full rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Masuk
                            </button>
                        </form>
                        <div className="text-center border-[0.5px] border-black/30 w-full my-6"></div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleGoogleLogin}
                                className="bg-white border rounded-lg py-2 px-4 flex items-center text-gray-700 hover:bg-gray-100"
                            >
                                <img
                                    src={googleImage}
                                    alt="Google"
                                    className="w-5 mr-2"
                                />
                                Continue with Google
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Belum punya akun?{" "}
                                <button
                                    onClick={onSignUpClick}
                                    className="text-blue-500 hover:underline"
                                >
                                    Daftar sekarang
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-cover hidden lg:flex items-center justify-end p-10 w-full lg:w-[50%]">
                    <img
                        src={sideImage}
                        alt="Batik Image"
                        className="object-cover rounded-xl w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;
