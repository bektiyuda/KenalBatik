import Megamendung from "../assets/megamendung-batik.png";
import SekarJagad from "../assets/sekarjagad.png";
import Kawung from "../assets/kawung.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import React, { useState, useEffect } from "react";

const SectionQuotes = React.forwardRef((props, ref) => {
    const [text] = useTypewriter({
        words: [
            "“Simbol kekuatan dan kebijaksanaan yang menyatukan kita dengan warisan budaya Jawa.”",
            "“Dalam setiap motif batik, tersimpan kekuatan jiwa dan kebijaksanaan leluhur yang mengikat kita pada akar budaya.”",
            "“Kebijaksanaan leluhur adalah obor yang menerangi jalan kita, mengingatkan kita pada identitas dan kekuatan budaya yang kita miliki.”",
        ],
        loop: {},
        typeSpeed: 60,
        deleteSpeed: 30,
    });

    const batikData = [
        {
            image: Megamendung,
            title: "Batik Megamendung ꦩꦺꦒꦩꦼꦤ꧀ꦢꦸꦁ",
            location: "Cirebon",
        },
        {
            image: SekarJagad,
            title: "Batik Sekar Jagad ꦱꦼꦏꦂ ꦗꦒꦢ꧀",
            location: "Yogyakarta",
        },
        {
            image: Kawung,
            title: "Batik Kawung ꦏꦮꦸꦁ",
            location: "Jawa Tengah",
        },
    ];

    const [currentBatikIndex, setCurrentBatikIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentBatikIndex(
                    (prevIndex) => (prevIndex + 1) % batikData.length
                );
                setIsTransitioning(false);
            }, 700);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [batikData.length]);

    const currentBatik = batikData[currentBatikIndex];

    return (
        <section ref={ref} className="w-full">
            <div className="px-4 md:px-20">
                <div className="flex justify-center mb-10">
                    <div className="bg-[#fef1e2] px-12 py-3 rounded-3xl shadow-2xl text-lg md:text-xl lg:text-2xl lg:px-16 font-sofiasans">
                        Wawasan
                    </div>
                </div>
                <div className="container mx-auto bg-[#fff1e3] rounded-[24px] md:rounded-[48px] shadow-2xl lg:h-[600px]">
                    <div className="flex flex-col md:flex lg:flex-row">
                        {/* Bagian kiri: teks kutipan tetap tanpa animasi */}
                        <div className="lg:basis-1/2 p-5 md:p-9 flex flex-col justify-between">
                            <h2 className="text-[#e4666c] h-64 md:h-80 lg:h-auto text-3xl md:text-5xl font-vidaloka">
                                {text}
                                <Cursor />
                            </h2>

                            {/* Bagian informasi batik yang berubah dengan animasi */}
                            <div
                                className={`lg:mt-10 transition-opacity duration-500 ease-in-out ${
                                    isTransitioning
                                        ? "opacity-0"
                                        : "opacity-100"
                                }`}
                            >
                                <h3 className="font-vidaloka text-xl md:text-3xl">
                                    {currentBatik.title}
                                </h3>
                                <p className="font-vidaloka text-lg md:text-2xl">
                                    {currentBatik.location}
                                </p>
                            </div>
                        </div>

                        {/* Bagian kanan: gambar batik yang berubah dengan animasi */}
                        <div className="p-5 md:p-10 lg:p-0 lg:basis-1/2">
                            <img
                                src={currentBatik.image}
                                alt={`gambar ${currentBatik.title}`}
                                className={`object-cover w-full h-[300px] md:h-[400px] rounded-[24px] lg:h-[600px] md:rounded-[24px] lg:rounded-r-[50px] lg:rounded-l-none transition-opacity duration-500 ease-in-out ${
                                    isTransitioning
                                        ? "opacity-0"
                                        : "opacity-100"
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default SectionQuotes;
