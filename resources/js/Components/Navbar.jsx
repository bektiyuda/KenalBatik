import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import Profil from "../Components/Profil";

const Navbar = ({ onLoginClick, onLogout, response }) => {
    const { auth } = usePage().props; // Ambil shared props dari Inertia.js
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk status login
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfilOpen, setIsProfilOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfil = () => setIsProfilOpen(!isProfilOpen);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        onLogout();
    };

    useEffect(() => {
        
        const tokenExists = !!auth;
        console.log("ini di navbar: ", auth);
        const isUserLoggedIn = auth?.user ? true : false;
        setIsAuthenticated(tokenExists && isUserLoggedIn);
    }, [auth]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <nav
                className={`bg-[#f7f2ed]/80 px-6 lg:px-20 top-0 z-50 backdrop-blur-md ${
                    isScrolled ? "bg-[#f7f2ed]/60" : "bg-[#f7f2ed]/80"
                }`}
            >
                <div className="container mx-auto flex items-center justify-between py-6 relative">
                    <ul className="hidden lg:flex space-x-16 font-vidaloka text-2xl font-normal text-[#E4676C]">
                        <li>
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="hover:text-[#c95745]"
                            >
                                Beranda
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    (window.location.href = "/catalog")
                                }
                                className="hover:text-[#c95745]"
                            >
                                Katalog
                            </button>
                        </li>
                    </ul>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => (window.location.href = "/")}
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
                                onClick={() =>
                                    (window.location.href = "/tentangkita")
                                }
                                className="hover:text-[#c95745]"
                            >
                                Tentang Kita
                            </button>
                        </li>

                        {isAuthenticated ? (
                            <li>
                                <button
                                    onClick={toggleProfil}
                                    className="hover:text-[#c95745]"
                                >
                                    Profil
                                </button>
                                {isProfilOpen && (
                                    <Profil onLogout={handleLogout} />
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
                                    window.location.href = "/";
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
                                    window.location.href = "/catalog";
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
                                    window.location.href = "/tentangkita";
                                    toggleMenu();
                                }}
                                className="hover:text-[#c95745]"
                            >
                                Tentang Kita
                            </button>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <button
                                    onClick={toggleProfil}
                                    className="hover:text-[#c95745]"
                                >
                                    Profil
                                </button>
                                {isProfilOpen && (
                                    <div className="mt-4">
                                        <Profil
                                            onLogout={handleLogout}
                                            userData={auth.user}
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
            </nav>
            <div
                className={`border-b-[1px] border-black/40 transition-all duration-500 ${
                    isMenuOpen ? "mt-4" : "mt-0"
                }`}
            ></div>
        </div>
    );
};

export default Navbar;
