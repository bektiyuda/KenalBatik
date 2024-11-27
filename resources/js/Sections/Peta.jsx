import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import sumatra from "../assets/pulau/sumatra.svg";
import jawa from "../assets/pulau/jawa.svg";
import kalimantan from "../assets/pulau/kalimantan.svg";
import maluku from "../assets/pulau/maluku.svg";
import ntb from "../assets/pulau/ntb.svg";
import sulawesi from "../assets/pulau/sulawesi.svg";
import ntt from "../assets/pulau/ntt.svg";
import bali from "../assets/pulau/bali.svg";
import papua from "../assets/pulau/papua.svg";

const Peta = () => {
    const [selectedPulau, setSelectedPulau] = useState("");
    const [batikData, setBatikData] = useState(null);
    const [isSlideVisible, setIsSlideVisible] = useState(false);

    const getIslandId = (pulau) => {
        switch (pulau) {
            case "Jawa":
                return 1;
            case "Sumatra":
                return 2;
            case "Kalimantan":
                return 3;
            case "Sulawesi":
                return 4;
            case "Papua":
                return 5;
            case "Maluku":
                return 6;
            case "NTB":
                return 7;
            case "NTT":
                return 8;
            case "Bali":
                return 9;
            default:
                return null;
        }
    };

    const handlePulauClick = async (pulau) => {
        const islandId = getIslandId(pulau);

        if (islandId === null) return;

        if (selectedPulau === pulau) {
            setIsSlideVisible(false);
            setTimeout(() => {
                setSelectedPulau("");
                setBatikData(null);
            }, 300);
        } else {
            setIsSlideVisible(false);
            setTimeout(async () => {
                setSelectedPulau(pulau);

                try {
                    const response = await axios.get(
                        `/homepage?pulau=${islandId}`
                    );
                    setBatikData(response.data.data);
                } catch (error) {
                    console.error("Error fetching batik data:", error);
                    setBatikData([]);
                } finally {
                    setIsSlideVisible(true);
                }
            }, 300);
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
                        className={`absolute top-20 left-10 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Sumatra"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={240}
                        width={240}
                        onClick={() => handlePulauClick("Sumatra")}
                    />
                    <img
                        src={jawa}
                        alt="jawa"
                        className={`absolute left-[250px] bottom-9 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Jawa"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Jawa")}
                    />
                    <img
                        src={kalimantan}
                        alt="kalimantan"
                        className={`absolute top-[70px] left-[340px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Kalimantan"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Kalimantan")}
                    />
                    <img
                        src={maluku}
                        alt="maluku"
                        className={`absolute right-[250px] top-32 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Maluku"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={150}
                        width={150}
                        onClick={() => handlePulauClick("Maluku")}
                    />
                    <img
                        src={ntb}
                        alt="ntb"
                        className={`absolute left-[500px] bottom-[83px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "NTB"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={70}
                        width={70}
                        onClick={() => handlePulauClick("NTB")}
                    />
                    <img
                        src={sulawesi}
                        alt="sulawesi"
                        className={`absolute right-[360px] top-[100px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Sulawesi"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={220}
                        width={220}
                        onClick={() => handlePulauClick("Sulawesi")}
                    />
                    <img
                        src={ntt}
                        alt="ntt"
                        className={`absolute right-[400px] bottom-9 transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "NTT"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={140}
                        width={140}
                        onClick={() => handlePulauClick("NTT")}
                    />
                    <img
                        src={bali}
                        alt="bali"
                        className={`absolute left-[470px] bottom-[105px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Bali"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={30}
                        width={30}
                        onClick={() => handlePulauClick("Bali")}
                    />
                    <img
                        src={papua}
                        alt="papua"
                        className={`absolute right-10 bottom-[100px] transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 ${
                            selectedPulau && selectedPulau !== "Papua"
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                        height={240}
                        width={240}
                        onClick={() => handlePulauClick("Papua")}
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
                                selectedPulau && selectedPulau !== "Sumatra"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Sumatra")}
                        />
                        <img
                            src={jawa}
                            alt="jawa"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Jawa"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Jawa")}
                        />
                        <img
                            src={kalimantan}
                            alt="kalimantan"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Kalimantan"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Kalimantan")}
                        />
                        <img
                            src={maluku}
                            alt="maluku"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Maluku"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Maluku")}
                        />
                        <img
                            src={ntb}
                            alt="ntb"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "NTB"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("NTB")}
                        />
                        <img
                            src={sulawesi}
                            alt="sulawesi"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Sulawesi"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Sulawesi")}
                        />
                        <img
                            src={ntt}
                            alt="ntt"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "NTT"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("NTT")}
                        />
                        <img
                            src={bali}
                            alt="bali"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Bali"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Bali")}
                        />
                        <img
                            src={papua}
                            alt="papua"
                            className={`transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-100 cursor-pointer ${
                                selectedPulau && selectedPulau !== "Papua"
                                    ? "opacity-40"
                                    : "opacity-100"
                            }`}
                            onClick={() => handlePulauClick("Papua")}
                        />
                    </div>
                </div>
            </div>

            {/* Wrapper for island names */}
            <div className="flex justify-center mt-10">
                <div className="bg-[#fef1e2] w-full md:max-w-[700px] lg:max-w-[1100px] -mt-20 pb-4 pt-14 rounded-b-[30px]">
                    <div className="flex flex-wrap justify-center text-center text-lg lg:text-2xl font-vidaloka">
                        {[
                            "Sumatra",
                            "Jawa",
                            "Kalimantan",
                            "Maluku",
                            "NTB",
                            "Sulawesi",
                            "NTT",
                            "Bali",
                            "Papua",
                        ].map((pulau) => (
                            <span
                                key={pulau}
                                className={`cursor-pointer mx-3 font-sofiasans ${
                                    selectedPulau === pulau
                                        ? "text-red-600"
                                        : ""
                                }`}
                                onClick={() => handlePulauClick(pulau)}
                            >
                                {pulau}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display batik data */}
            <div
                className={`overflow-hidden rounded-b-3xl w-full md:max-w-[700px] lg:max-w-[1100px] mx-auto -translate-y-6 z-0 relative transition-all duration-500 ease-in-out ${
                    isSlideVisible
                        ? "max-h-full opacity-100 bg-[#fef1e2] mt-2 py-6"
                        : "max-h-0 opacity-0"
                }`}
            >
                {batikData && batikData.length > 0 ? (
                    <div className="mt-8">
                        <h2 className="text-center font-vidaloka text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                            Pulau {selectedPulau}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-28">
                            {batikData.slice(0, 3).map((batik, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row items-center md:items-start mb-8 sm:mb-10 md:mb-14"
                                >
                                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                        <img
                                            src={batik.link_image}
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
                                                router.visit(
                                                    `/overview/${batik.id}`
                                                )
                                            }
                                        >
                                            Pelajari Batik Ini Lebih Lanjut
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {batikData.length > 3 && (
                                <div className="text-center mb-5">
                                    <button
                                        className="text-base bg-[#f9d5b6] px-3 py-2 lg:text-2xl md:text-xl rounded-xl font-vidaloka"
                                        onClick={() =>
                                            router.visit(
                                                `/catalog?pulau=${selectedPulau}`
                                            )
                                        }
                                    >
                                        Klik untuk melihat batik {selectedPulau}{" "}
                                        lebih banyak
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </section>
    );
};

export default Peta;
