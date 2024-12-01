import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import LoginPopup from "../Components/auth/LoginPopup";
import SignUpPopup from "../Components/auth/SignUpPopup";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";
import Navbar from "../Components/Navbar";
import Footer from "../Sections/Footer";
import arrowRight from "../Assets/arrow-right.svg";
import arrowLeft from "../Assets/arrow-left.svg";

const Catalog = ({
    batik = [],
    islands = [],
    provinces = [],
    currentPage = 1,
    totalPages = 1,
    selectedIsland = "",
    selectedProvince = "",
}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

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

    const handleFilterChange = (newIsland, newProvince) => {
        router.get(
            "/catalog",
            {
                pulau: newIsland === "" ? null : newIsland,
                provinsi: newProvince === "" ? null : newProvince,
                page: 1,
            },
            { preserveScroll: true }
        );
    };

    const handlePageChange = (page) => {
        console.log("Navigating to Page:", page);
        if (page >= 1 && page <= totalPages) {
            router.get("/catalog", {
                pulau: selectedIsland || null,
                provinsi: selectedProvince || null,
                page,
            });
        }

        console.log("Current Page from Props:", currentPage);
        console.log("Total Pages from Props:", totalPages);
    };

    const getPageNumbers = () => {
        const maxVisiblePages = 7;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    };

    const quotesVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
            },
        },
    };

    useEffect(() => {
        console.log(batik)
    }, []);

    return (
        <section className="w-full relative">
            <div className="w-full fixed top-0 z-5">
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

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={quotesVariant}
            >
                <div className="max-w-full py-20 mb-10 font-vidaloka mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                    <h2 className="text-center text-2xl md:text-5xl lg:text-6xl mt-6 md:mt-10">
                        Koleksi Batik Indonesia
                    </h2>
                    <p className="text-center md:text-2xl lg:text-3xl mb-10">
                        Temukan Keunikan Setiap Motif
                    </p>

                    {/* Filter Section */}
                    <div className="flex justify-center gap-4 mb-6">
                        <select
                            value={selectedIsland || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleFilterChange(value, "");
                            }}
                            className="border p-2 rounded"
                        >
                            <option value="">Semua Pulau</option>
                            {islands.map((island) => (
                                <option key={island.id} value={island.id}>
                                    {island.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedProvince || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleFilterChange(selectedIsland, value);
                            }}
                            className="border p-2 rounded"
                        >
                            <option value="">Semua Provinsi</option>
                            {provinces
                                .filter(
                                    (province) =>
                                        !selectedIsland ||
                                        province.islandId ===
                                            parseInt(selectedIsland)
                                )
                                .map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}
                                    >
                                        {province.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Display Filtered Batiks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {batik.length > 0 ? (
                            batik.map((item, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        router.get(`/batik/${item.id}`)
                                    }
                                >
                                    <img
                                        src={item.linkImage}
                                        alt={`gambar-${item.name}`}
                                        className="w-full rounded-2xl h-64 md:h-52 xl:h-60 object-cover"
                                    />
                                    <h3 className="mt-5 text-2xl sm:text-3xl">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg sm:text-xl">
                                        {item.province_name}/{item.city}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-xl">
                                batik tidak ditemukan.
                            </p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-10">
                        <nav className="inline-flex bg-gray-100 rounded-full shadow-md py-2 px-4">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                className={`px-3 py-1 rounded-full ${
                                    currentPage === 1
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-black"
                                }`}
                                disabled={currentPage === 1}
                            >
                                <img src={arrowLeft} alt="Previous" />
                            </button>

                            {getPageNumbers().map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded-full ${
                                        currentPage === page
                                            ? "bg-red-400 text-white"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                className={`px-3 py-1 rounded-full ${
                                    currentPage === totalPages
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-black"
                                }`}
                                disabled={currentPage === totalPages}
                            >
                                <img src={arrowRight} alt="Next" />
                            </button>
                        </nav>
                    </div>
                </div>
                <Footer />
            </motion.div>
        </section>
    );
};

export default Catalog;
