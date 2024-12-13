import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import backgroundImage from "../assets/background-introkuis.png";

const IntroQuiz = ({ isLoggedIn }) => {
    const { auth } = usePage().props;
    const token = auth.user;
    const [showPopup, setShowPopup] = useState(false);

    const handleQuizClick = () => {
        if (!token) {
            console.log(token);
            setShowPopup(true);
        } else {
            router.visit("/prequiz");
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const slideInFromLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
            },
        },
    };

    return (
        <section className="w-full relative pt-4 lg:mt-32">
            {/* Background overlay for gradient */}
            <div className="absolute inset-0 top-0 md:top-0 lg:-top-52 h-[100px] md:h-[200px] lg:h-[340px] bg-[#f7f2ed] z-0"></div>
            <div className="absolute inset-0 top-24 md:top-48 lg:top-32 h-[200px] md:h-[300px] lg:h-[400px] bg-gradient-to-b from-[#f7f2ed] to-transparent z-10"></div>

            {/* Main content sliding from left */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={slideInFromLeft}
                className="relative z-20 mx-4 md:mx-16" // Give z-index to content
            >
                <div className="flex flex-col">
                    <h2 className="text-5xl font-vidaloka md:text-8xl leading-10 lg:text-9xl lg:leading-10">
                        Gimana, <br />
                        <span className="text-xl md:text-3xl lg:text-4xl">
                            sudah siap tes pengetahuanmu tentang batik?
                        </span>
                    </h2>

                    <div className="flex mt-5">
                        <button
                            onClick={handleQuizClick}
                            className="bg-[#e4666c] md:text-xl text-lg text-white px-5 py-2 md:px-6 rounded-xl shadow-lg z-30 transition duration-300 ease-in-out hover:bg-red-500"
                        >
                            Mulai Kuis
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Background image */}
            <div
                className="-mt-24 md:-mt-32 lg:-mt-96 h-[300px] md:h-[500px] lg:h-[900px] w-full bg-cover bg-center bg-no-repeat z-10"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            ></div>

            {/* Confirmation popup */}
            {showPopup && (
                <ConfirmationPopup
                    onClose={handleClosePopup}
                    onLogin={handleQuizClick}
                />
            )}
        </section>
    );
};

export default IntroQuiz;
