import { router } from "@inertiajs/react";
import Logo from "../assets/logo.svg";

const Footer = () => {
    return (
        <footer>
            {/* Bagian Utama Footer */}
            <div className="w-full bg-gradient-to-b from-[#f9f9f9] to-[#ffffff] mx-auto text-center flex flex-col justify-center items-center py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-24">
                <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full sm:w-3/4 md:w-2/3 font-vidaloka mb-4 lg:mb-6 text-gray-900">
                    Berakar pada Budaya, Digerakkan oleh Inovasi.
                </h4>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl w-full sm:w-[500px] md:w-[600px] lg:w-[800px] font-light text-gray-700 mb-6 lg:mb-8">
                    Kenal Batik adalah inisiatif non-profit yang bertujuan
                    mengenalkan batik sebagai warisan budaya bangsa. Kami
                    percaya bahwa setiap motif memiliki cerita, dan melalui
                    pendekatan yang kreatif, kami ingin masyarakat lebih
                    memahami dan mencintai batik.
                </p>

                {/* Tombol-Tombol */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-base sm:text-lg md:text-xl mt-4">
                    <button
                        onClick={() => router.visit("/cerita")}
                        className="bg-[#F7F9FB] px-6 py-2 rounded-xl text-center hover:bg-gray-100 transition"
                    >
                        👀 Cerita Kenal Batik
                    </button>
                    <button
                        onClick={() => router.visit("/tentangkita")}
                        className="bg-[#F7F9FB] px-6 py-2 rounded-xl text-center hover:bg-gray-100 transition"
                    >
                        👋 Sapa Kami
                    </button>
                </div>

                {/* Divider di Tengah */}
                <div className="border-t-2 border-gray-300 w-full mx-4 sm:mx-10 md:mx-20 my-6"></div>

                {/* Bagian Bawah */}
                <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:px-10 md:px-20 gap-6 lg:gap-20">
                    <div className="flex justify-center sm:justify-start items-center mb-4 sm:mb-0">
                        <img src={Logo} width={80} height={80} alt="logo" />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center sm:text-left">
                        {"\u00a9"} 2024 Kenal Batik. Semua Hak Dilindungi.
                        Berkontribusi untuk Melestarikan Batik.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
