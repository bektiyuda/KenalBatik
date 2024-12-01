import Logo from "../Assets/logo.svg";
import Lampu from "../Assets/lampu.png";
import Footer from "../Sections/Footer";
import Navbar from "../Components/Navbar";
import LoginPopup from "../Components/auth/LoginPopup";
import SignUpPopup from "../Components/auth/SignUpPopup";
import ForgotPasswordPopup from "../Components/auth/ForgotPasswordPopup";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Cerita = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); // Menyimpan data pengguna

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
            fetchUserProfile(token);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

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
        setUserData(null); // Hapus data pengguna setelah logout
        localStorage.removeItem("authToken");
        window.location.reload(); // Refresh page setelah logout
    };

    const handleLogin = (token) => {
        localStorage.setItem("authToken", token); // Simpan token ke localStorage
        setIsLoggedIn(true);
        fetchUserProfile(token); // Ambil data pengguna setelah login
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
        <section className="w-full relative">
            <div className="w-full top-0 fixed z-50">
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
                className="my-5 pt-24 md:pt-14 mb-20 mx-5 md:mx-10 lg:mx-20"
            >
                <h2 className="text-center font-vidaloka lg:text-5xl lg:mt-20 text-3xl md:text-4xl md:mt-10 lg:mb-10">
                    Cerita di Balik Kenal Batik
                </h2>
                <div className="lg:flex lg:items-center lg:mb-10">
                    <div className="flex justify-center lg:basis-2/6">
                        <img
                            src={Logo}
                            alt="logo"
                            className="w-64 h-64 lg:w-80 lg:h-80"
                        />
                    </div>

                    <div className="lg:basis-4/6 font-sofiasans md:text-xl">
                        <p className="mb-5 text-justify">
                            Dalam arus modernisasi, budaya asli kita, termasuk
                            batik, sering kali terpinggirkan. Kami di Kenal
                            Batik hadir untuk menjawab tantangan ini dengan cara
                            melestarikan batik di era digital. Dengan platform
                            interaktif dan relevan, kami berusaha menghidupkan
                            kembali batik serta menjangkau generasi muda yang
                            belum akrab dengan warisan ini.
                        </p>
                        <p className="text-justify">
                            {" "}
                            Kenal Batik bukan hanya katalog motif, tetapi sebuah
                            perjalanan memahami makna batik dan menyampaikan
                            warisan ini ke masa depan.
                        </p>
                    </div>
                </div>

                <div className="lg:flex flex-row-reverse">
                    <div className="flex justify-center lg:basis-2/6 lg:items-center">
                        <img
                            src={Lampu}
                            alt="lampu"
                            className="lg:w-96 lg:h-96 w-80 h-80"
                        />
                    </div>
                    <div className="lg:basis-4/6 md:text-xl font-sofiasans">
                        <p className="mb-4 text-justify">
                            Kenal Batik lahir dari kecintaan dan keprihatinan.
                            Kami menyadari bahwa batik, lebih dari sekadar kain,
                            adalah cerita. Setiap motif dan warna memiliki
                            makna, menyimpan sejarah, dan membawa identitas
                            daerah asalnya. Namun, dalam era globalisasi ini,
                            sering kali warisan budaya kita terpinggirkan oleh
                            arus budaya asing yang masuk dengan begitu kuat.
                        </p>
                        <p className="mb-4 text-justify">
                            Sebagai generasi yang tumbuh di tengah perkembangan
                            teknologi, kami tidak ingin hanya diam melihat
                            budaya kita perlahan memudar. Kami ingin membawa
                            batik ke panggung global, dengan cara yang relevan
                            bagi generasi sekarang, tanpa melupakan akar tradisi
                            yang mendalam. Teknologi adalah alat, namun batik
                            adalah jiwanya.
                        </p>
                        <p className="mb-4 text-justify">
                            Lewat Kenal Batik, kami ingin menyampaikan pesan
                            bahwa tradisi dan inovasi bisa berjalan beriringan.
                            Kami percaya, melestarikan batik tidak harus dengan
                            cara lama. Kami ingin memanfaatkan teknologi digital
                            untuk membuka jendela baru bagi dunia,
                            memperkenalkan batik sebagai bagian tak terpisahkan
                            dari kekayaan budaya kita, yang patut dibanggakan,
                            dipahami, dan diapresiasi oleh semua kalangan.
                        </p>
                        <p className="mb-4 text-justify">
                            Setiap langkah dalam perjalanan ini, dari desain
                            hingga pengembangan situs, adalah upaya untuk
                            menjawab satu pertanyaan besar, Bagaimana kita bisa
                            membuat generasi muda bangga dengan warisan budaya
                            mereka? Jawabannya adalah dengan menghadirkan batik
                            secara interaktif, modern, dan menyenangkan, sesuai
                            dengan gaya hidup mereka saat ini
                        </p>
                        <p className="mb-4 text-justify">
                            Bagi kami, Kenal Batik adalah jembatan antara masa
                            lalu yang penuh sejarah dan masa depan yang penuh
                            inovasi. Kami berharap situs ini tidak hanya menjadi
                            tempat belajar, tetapi juga menjadi sarana untuk
                            mengenal lebih dalam warisan budaya yang telah
                            diwariskan kepada kita.
                        </p>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </section>
    );
};

export default Cerita;
