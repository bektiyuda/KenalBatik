import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import Profil from "../Components/Profil";
import { router } from "@inertiajs/react";

const Navbar = ({ onLoginClick, onLogout, isLoggedIn, userData }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfilOpen, setIsProfilOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfil = () => {
        setIsProfilOpen(!isProfilOpen); 
    };

    return (
        <nav className="bg-pattern px-6 lg:px-20 relative">
            <div className="container mx-auto flex items-center justify-between py-6 relative">
                <ul className="hidden lg:flex space-x-16 font-vidaloka text-2xl font-normal text-[#E4676C]">
                    <li>
                        <button
                            onClick={() => router.visit("/")}
                            className="hover:text-[#c95745]"
                        >
                            Beranda
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => router.visit("/catalog")}
                            className="hover:text-[#c95745]"
                        >
                            Katalog
                        </button>
                    </li>
                </ul>

                {/* Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={() => router.visit("/")}
                        className="font-upakarti text-4xl text-[#E4676C]"
                    >
                        <img
                            src={Logo}
                            height={80}
                            width={80}
                            alt="logo-batik-kita"
                        />
                    </button>
                </div>

                <ul className="hidden lg:flex space-x-16 font-vidaloka text-2xl font-normal text-[#E4676C]">
                    <li>
                        <button
                            onClick={() => router.visit("/tentangkita")}
                            className="hover:text-[#c95745]"
                        >
                            Tentang Kita
                        </button>
                    </li>
                    {isLoggedIn && userData ? (
                        <li className="relative">
                            <button
                                onClick={toggleProfil}
                                className="hover:text-[#c95745]"
                            >
                                Profil
                            </button>
                            {isProfilOpen && (
                                <Profil
                                    onLogout={onLogout}
                                    userData={userData}
                                />
                            )}
                        </li>
                    ) : (
                        <li>
                            <button
                                onClick={onLoginClick}
                                className="hover:text-[#c95745]"
                            >
                                Masuk
                            </button>
                        </li>
                    )}
                </ul>

                {/* Hamburger Icon for Mobile and Tablet */}
                <button
                    className="block lg:hidden text-3xl text-[#E4676C] focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile and Tablet menu dropdown */}
            <div
                className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                    isMenuOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <ul className="w-full py-4 text-center text-2xl font-vidaloka text-[#E4676C] space-y-4 transition-opacity duration-300 ease-in-out">
                    <li>
                        <button
                            onClick={() => {
                                router.visit("/");
                                toggleMenu();
                            }}
                            className="hover:text-[#c95745]"
                        >
                            Beranda
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                router.visit("/catalog");
                                toggleMenu();
                            }}
                            className="hover:text-[#c95745]"
                        >
                            Katalog
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                router.visit("/tentangkita");
                                toggleMenu();
                            }}
                            className="hover:text-[#c95745]"
                        >
                            Tentang Kita
                        </button>
                    </li>
                    {isLoggedIn && userData ? (
                        <li className="">
                            <button
                                onClick={toggleProfil}
                                className="hover:text-[#c95745]"
                            >
                                Profil
                            </button>
                            {isProfilOpen && (
                                <div className="mt-4">
                                    <Profil
                                        onLogout={onLogout}
                                        userData={userData}
                                    />
                                </div>
                            )}
                        </li>
                    ) : (
                        <li>
                            <button
                                onClick={onLoginClick}
                                className="hover:text-[#c95745]"
                            >
                                Masuk
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            <div
                className={`border-b-[1px] border-black/40 transition-all duration-500 ${
                    isMenuOpen ? "mt-4" : "mt-0"
                }`}
            ></div>
        </nav>
    );
};

export default Navbar;
