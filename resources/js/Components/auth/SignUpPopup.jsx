import React, { useState } from "react";
import { router } from "@inertiajs/react";
import sideImage from "../../Assets/signup-image.png";
import Logo from "../../Assets/logo.svg";
import googleImage from "../../Assets/Google Logo.svg";

const SignUpPopup = ({ onClose, onSignUpSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        console.log("Form data submitted:", formData);
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Password dan konfirmasi password tidak cocok.");
            return;
        }

        router.post(
            "/register",
            {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            },
            {
                onSuccess: () => {
                    setSuccessMessage(
                        "Pendaftaran berhasil! Anda dapat masuk sekarang."
                    );
                    setErrorMessage("");
                    setFormData({
                        email: "",
                        username: "",
                        password: "",
                        confirmPassword: "",
                    });
                    setTimeout(() => {
                        onSignUpSuccess();
                        onClose();
                    }, 3000);
                },
                onError: (errors) => {
                    setErrorMessage(
                        errors.email || "Pendaftaran gagal, coba lagi."
                    );
                },
            }
        );
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
            onClick={handleOverlayClick} // Event untuk menutup jika klik di luar modal
        >
            <div className="bg-[#f7f2ed] rounded-xl shadow-lg flex flex-col lg:flex-row w-[90%] max-w-[1200px] h-auto lg:h-[700px] transform transition-transform duration-300 ease-in-out scale-100 relative">
                {/* Icon Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200 z-50" // Added z-50 to ensure it's on top
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
                    {/* Logo Kenal Batik, centered on mobile screens */}
                    <img
                        src={Logo}
                        width={40}
                        height={40}
                        alt="Kenal Batik"
                        className="block mx-auto mb-4 sm:mb-8 sm:absolute sm:top-12 sm:left-10 lg:top-12 lg:left-12"
                    />

                    <div className="w-full max-w-[400px] mt-4 sm:mt-10">
                        <h2 className="text-xl font-semibold text-[#333]">
                            Daftar
                        </h2>
                        <p className="mb-6 text-gray-500 text-sm">
                            Daftar akun untuk meningkatkan pengetahuan batikmu!
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    User name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Kata Sandi
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Konfirmasi Kata Sandi
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Tampilkan pesan error jika ada */}
                            {errorMessage && (
                                <p className="text-red-500">{errorMessage}</p>
                            )}

                            {/* Tampilkan pesan sukses jika pendaftaran berhasil */}
                            {successMessage && (
                                <p className="text-green-500">
                                    {successMessage}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="bg-[#092fb5] text-white mt-1 py-3 px-4 w-full rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                            >
                                Daftar
                            </button>
                        </form>
                        <div className="text-center border-[0.5px] border-black/30 w-full my-6"></div>
                        <div className="flex justify-center">
                            <button className="bg-white border rounded-lg py-2 px-4 flex items-center text-gray-700 hover:bg-gray-100 transition duration-200">
                                <img
                                    src={googleImage}
                                    alt="Google"
                                    className="w-5 mr-2"
                                />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan (Gambar), hanya ditampilkan pada layar besar (lg ke atas) */}
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

export default SignUpPopup;
