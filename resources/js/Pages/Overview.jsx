import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Sections/Footer";
import { motion } from "framer-motion";
import Tokopedia from "../Assets/tokopedia.png";
import Shopee from "../Assets/shopee.png";
import LoginPopup from "../Components/auth/LoginPopup";
import SignUpPopup from "../Components/auth/SignUpPopup";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";

const Overview = ({batik = {}, relatedBatik = []}) => {
    console.log("Batik:", batik);
    console.log("Related Batik:", relatedBatik);
    const { id } = useParams();
    const [batikDetail, setBatikDetail] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [relatedBatiks, setRelatedBatiks] = useState([]); 

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);


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

    const quotesVariant = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
            },
        },
    };

   
    return (
        <div>
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

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={quotesVariant}
                className="mt-10 px-4 lg:px-0 mx-auto lg:mx-20"
            >
                <div className="flex flex-col md:flex-row justify-between">
                    {batik && (
                        <>
                            <div className="md:w-1/2 flex flex-col items-center mb-10 md:mb-0">
                                <div className="flex justify-center w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-white p-3 rounded-[30px]">
                                    <img
                                        src={batik.linkImage}
                                        alt={`gambar-${batik.name}`}
                                        className="w-full object-cover rounded-[22px] shadow-lg"
                                    />
                                </div>
                                <button
                                    className="w-[290px] lg:w-[390px] hover:bg-emerald-300/20 transition duration-300 ease-in-out border-2 lg:border-4 border-[#47b750] bg-white mt-5 px-6 py-2 rounded-2xl font-sofiasans shadow-2xl text-lg lg:text-2xl flex justify-between items-center"
                                    onClick={() =>
                                        (window.location.href = `https://www.tokopedia.com/search?q=${encodeURIComponent(
                                            batik.name
                                        )}`)
                                    }
                                >
                                    Cari Batik ini di Tokopedia
                                    <img
                                        className="w-7 h-7 lg:w-9 lg:h-9"
                                        src={Tokopedia}
                                        alt="tokopedia-img"
                                    />
                                </button>
                                <button
                                    className="w-[290px] lg:w-[390px] hover:bg-orange-300/20 transition duration-300 ease-in-out border-2 lg:border-4 border-[#ee4d2d] bg-white mt-3 px-6 py-2 rounded-2xl font-sofiasans shadow-2xl text-lg lg:text-2xl flex justify-between items-center"
                                    onClick={() =>
                                        (window.location.href = `https://www.shopee.co.id/search?keyword=${encodeURIComponent(
                                            batik.name
                                        )}`)
                                    }
                                >
                                    Cari Batik ini di Shopee
                                    <img
                                        className="w-8 h-8 lg:w-10 lg:h-10"
                                        src={Shopee}
                                        alt="shopee-img"
                                    />
                                </button>
                            </div>

                            <div className="md:w-1/2 md:pr-10 md:py-5">
                                <h1 className="md:text-6xl text-4xl font-vidaloka md:mb-2">
                                    {batik.name}
                                </h1>
                                <p className="md:text-3xl text-xl  mb-6 font-vidaloka">
                                    {batik.province_name}, {batik.city}
                                </p>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">
                                        Filosofi
                                    </h2>
                                    <p className="leading-relaxed text-justify">
                                        {batik.description}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full border-[1px] border-black/20 mt-20"></div>

                <div className="mt-12">
                    <h2
                        className="text-center text-xl mb-16 cursor-pointer font-normal hover:underline"
                        onClick={() => router.get("/catalog")}
                    >
                        LIHAT BATIK LAINNYA
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:mx-10 lg:mx-0 lg:grid-cols-3 gap-6">
                        {relatedBatik.slice(0, 3).map((batik, index) => (
                            <div
                                key={index}
                                className="font-vidaloka cursor-pointer"
                                onClick={() => router.get(`/batik/${batik.id}`)}
                            >
                                <img
                                    src={batik.linkImage}
                                    alt={`gambar-${batik.name}`}
                                    className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
                                />
                                <h3 className="text-4xl">{batik.name}</h3>
                                <p className="text-xl">{batik.province_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default Overview;
