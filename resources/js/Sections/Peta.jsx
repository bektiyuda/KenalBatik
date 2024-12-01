import { useState, useRef } from "react";
import { router } from "@inertiajs/react";
import sumatra from "../assets/pulau/sumatra.svg";
import jawa from "../assets/pulau/jawa.svg";
import kalimantan from "../assets/pulau/kalimantan.svg";
import maluku from "../assets/pulau/maluku.svg";
import ntb from "../assets/pulau/ntb.svg";
import sulawesi from "../assets/pulau/sulawesi.svg";
import ntt from "../assets/pulau/ntt.svg";
import bali from "../assets/pulau/bali.svg";
import papua from "../assets/pulau/papua.svg";

const Peta = ({ batiks = [] }) => {
    const [selectedPulau, setSelectedPulau] = useState("");
    const [isSlideVisible, setIsSlideVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dropdownRef = useRef(null);

    const handlePulauClick = (pulau, islandId) => {
        if (selectedPulau?.name === pulau) {
            // Reset ke keadaan awal
            setIsSlideVisible(false);
            setTimeout(() => {
                setSelectedPulau(""); // Tidak ada pulau yang dipilih
                router.get(
                    "/homepage",
                    {},
                    { preserveScroll: true, preserveState: true }
                );
            }, 300);
        } else {
            // Pilih pulau baru
            setIsLoading(true);
            setIsSlideVisible(false);
            setTimeout(() => {
                setSelectedPulau({ name: pulau, id: islandId }); // Set pulau terpilih
                router.get(
                    "/homepage",
                    { pulau: islandId },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            setIsLoading(false);
                            scrollToDropdown(); // Scroll otomatis ke dropdown
                        },
                    }
                );
                setIsSlideVisible(true);
            }, 300);
        }
    };


    const scrollToDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section className="w-full px-4 md:px-10 py-4 my-20">
            <div className="flex justify-center mb-10">
                <div className="bg-[#fef1e2] px-12 py-3 rounded-3xl shadow-2xl text-lg md:text-xl lg:text-2xl lg:px-16 font-sofiasans">
                    Pengetahuan
                </div>
            </div>
            <h2 className="text-center my-3 font-vidaloka text-3xl md:text-5xl">
                Kenali Batik Daerahmu
            </h2>

            {/* Large screen layout */}
            <div className="hidden lg:flex justify-center">
                <div className="bg-gradient-to-b from-[#fef1e2] to-[#f9d5b6] w-[1100px] h-[500px] flex relative py-20 rounded-[50px] shadow-xl z-30">
                    <img
                        src={sumatra}
                        alt="sumatra"
                        className={`absolute top-20 left-10 transition-all duration-500 ease-in-out transform hover:scale-110 ${
                            selectedPulau?.name === "Sumatra" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={240}
                        width={240}
                        onClick={() => handlePulauClick("Sumatra", 2)}
                    />
                    <img
                        src={jawa}
                        alt="jawa"
                        className={`absolute left-[250px] bottom-9 transition-all duration-500 ease-in-out transform hover:scale-110 ${
                            selectedPulau?.name === "Jawa" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Jawa", 1)}
                    />
                    <img
                        src={kalimantan}
                        alt="kalimantan"
                        className={`absolute top-[70px] left-[340px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "Kalimantan" ||
                            !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Kalimantan", 3)}
                    />
                    <img
                        src={maluku}
                        alt="maluku"
                        className={`absolute right-[250px] top-32 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "Maluku" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={150}
                        width={150}
                        onClick={() => handlePulauClick("Maluku", 6)}
                    />
                    <img
                        src={ntb}
                        alt="ntb"
                        className={`absolute left-[500px] bottom-[83px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "NTB" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={70}
                        width={70}
                        onClick={() => handlePulauClick("NTB", 7)}
                    />
                    <img
                        src={sulawesi}
                        alt="sulawesi"
                        className={`absolute right-[360px] top-[100px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "Sulawesi" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Sulawesi", 4)}
                    />
                    <img
                        src={ntt}
                        alt="ntt"
                        className={`absolute right-[400px] bottom-9 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "NTT" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={140}
                        width={140}
                        onClick={() => handlePulauClick("NTT", 8)}
                    />
                    <img
                        src={bali}
                        alt="bali"
                        className={`absolute left-[470px] bottom-[105px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "Bali" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={30}
                        width={30}
                        onClick={() => handlePulauClick("Bali", 9)}
                    />
                    <img
                        src={papua}
                        alt="papua"
                        className={`absolute right-10 bottom-[100px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau?.name === "Papua" || !selectedPulau
                                ? "opacity-100"
                                : "opacity-40"
                        }`}
                        height={240}
                        width={240}
                        onClick={() => handlePulauClick("Papua", 5)}
                    />
                </div>
            </div>

            {/* Medium and small screen layout */}
            <div className="lg:hidden flex justify-center">
                <div className="bg-gradient-to-b from-[#fef1e2] to-[#f9d5b6] w-full max-w-[700px] h-auto flex flex-col items-center py-6 rounded-[30px] shadow-xl z-50">
                    <div className="grid grid-cols-3 gap-4 w-full px-4">
                        <img
                            src={sumatra}
                            alt="sumatra"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Sumatra" ||
                                !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Sumatra", 2)}
                        />
                        <img
                            src={jawa}
                            alt="jawa"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Jawa" || !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Jawa", 1)}
                        />
                        <img
                            src={kalimantan}
                            alt="kalimantan"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Kalimantan" ||
                                !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Kalimantan", 3)}
                        />
                        <img
                            src={maluku}
                            alt="maluku"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Maluku" ||
                                !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Maluku", 6)}
                        />
                        <img
                            src={ntb}
                            alt="ntb"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "NTB" || !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("NTB", 7)}
                        />
                        <img
                            src={sulawesi}
                            alt="sulawesi"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Sulawesi" ||
                                !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Sulawesi", 4)}
                        />
                        <img
                            src={ntt}
                            alt="ntt"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "NTT" || !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("NTT", 8)}
                        />
                        <img
                            src={bali}
                            alt="bali"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Bali" || !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Bali", 9)}
                        />
                        <img
                            src={papua}
                            alt="papua"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau?.name === "Papua" ||
                                !selectedPulau
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                            onClick={() => handlePulauClick("Papua", 5)}
                        />
                    </div>
                </div>
            </div>

            {/* Wrapper for island names */}
            <div className="flex justify-center mt-10">
                <div className="bg-[#fef1e2] w-full md:max-w-[700px] lg:max-w-[1100px] -mt-20 pb-4 pt-14 rounded-b-[30px]">
                    <div className="flex flex-wrap justify-center text-center text-lg lg:text-2xl font-vidaloka">
                        {[
                            { name: "Sumatra", id: 2 },
                            { name: "Jawa", id: 1 },
                            { name: "Kalimantan", id: 3 },
                            { name: "Maluku", id: 6 },
                            { name: "NTB", id: 7 },
                            { name: "Sulawesi", id: 4 },
                            { name: "NTT", id: 8 },
                            { name: "Bali", id: 9 },
                            { name: "Papua", id: 5 },
                        ].map((pulau) => (
                            <span
                                key={pulau.id}
                                className={`cursor-pointer mx-3 font-sofiasans ${
                                    selectedPulau?.name === pulau.name
                                        ? "text-red-600"
                                        : "text-gray-700"
                                }`}
                                onClick={() =>
                                    handlePulauClick(pulau.name, pulau.id)
                                }
                            >
                                {pulau.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={dropdownRef}
                className={`overflow-hidden rounded-b-3xl w-full md:max-w-[700px] lg:max-w-[1100px] mx-auto -translate-y-6 z-0 relative transition-all duration-500 ease-in-out ${
                    isSlideVisible
                        ? "max-h-full opacity-100 bg-[#fef1e2] mt-2 py-6"
                        : "max-h-0 opacity-0"
                }`}
            >
                {isLoading ? (
                    // Skeleton Loading Placeholder
                    <div
                        className={`grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-28 transition-opacity duration-300 ${
                            isSlideVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center md:items-start mb-8 sm:mb-10 md:mb-14"
                            >
                                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                    <div className="bg-gray-300 animate-pulse w-full h-56 max-w-[300px] md:max-w-[350px] lg:max-w-[400px] rounded-2xl mx-auto"></div>
                                </div>
                                <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
                                    <div className="bg-gray-300 animate-pulse h-6 w-3/4 mb-4 mx-auto md:mx-0"></div>
                                    <div className="bg-gray-300 animate-pulse h-6 w-1/2 mb-4 mx-auto md:mx-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : batiks.length > 0 ? (
                    // Display Data When Batiks Exist
                    <div className="mt-8">
                        <h2 className="text-center font-vidaloka text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                            Pulau {selectedPulau?.name || ""}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-28">
                            {batiks.slice(0, 3).map((batik, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row items-center md:items-start mb-8 sm:mb-10 md:mb-14"
                                >
                                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                        <img
                                            src={batik.linkImage}
                                            alt={batik.name}
                                            className="rounded-2xl w-full max-h-56 max-w-[300px] md:max-w-[350px] lg:max-w-[400px] mx-auto"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
                                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-vidaloka">
                                            {batik.name}
                                        </p>
                                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-vidaloka mb-4 sm:mb-6 lg:mb-8">
                                            {batik.city}, {batik.province}
                                        </p>
                                        <button
                                            className="cursor-pointer px-2 py-2 rounded-xl text-white bg-[#E4676C] text-sm sm:text-base md:text-lg"
                                            onClick={() =>
                                                router.get(`/batik/${batik.id}`)
                                            }
                                        >
                                            Pelajari Batik Ini Lebih Lanjut
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {batiks.length > 3 && (
                                <div className="text-center mb-5">
                                    <button
                                        className="text-base bg-[#f9d5b6] px-3 py-2 lg:text-2xl md:text-xl rounded-xl font-vidaloka"
                                        onClick={() => {
                                            router.get(
                                                `/catalog?page=1&provinsi=&pulau=${selectedPulau.id}`
                                            );
                                        }}
                                    >
                                        Klik untuk melihat batik{" "}
                                        {selectedPulau?.name || ""} lebih banyak
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Display If No Batiks Found
                    <p className="text-center text-lg font-sofiasans text-gray-500">
                        Tidak ada data batik untuk pulau {selectedPulau}.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Peta;
