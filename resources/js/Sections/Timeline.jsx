const Timeline = () => {
    const timelineData = [
        {
            year: "1817",
            text: "Batik pertama kali tercatat dalam buku sejarah oleh Sir Thomas Stamford Raffles, yang menjabat sebagai gubernur Hindia Belanda. Dalam bukunya yang berjudul The History of Java, Raffles mencatat keberadaan batik sebagai kain yang dihiasi dengan motif-motif indah.",
        },
        {
            year: "1873",
            text: "Batik Indonesia diperkenalkan ke dunia internasional. Pada tahun ini, batik Indonesia mulai dikenal di Eropa, dibawa oleh pedagang asing yang tertarik dengan keindahan dan keunikan kain batik.",
        },
        {
            year: "1940",
            text: "Batik Cap mulai dikenal luas di Indonesia. Batik Cap adalah teknik batik baru yang lebih cepat dibandingkan batik tulis, yang mengurangi waktu produksi namun tetap mempertahankan motif-motif tradisional.",
        },
        {
            year: "1960",
            text: "Presiden Soekarno mempopulerkan batik sebagai simbol nasionalisme dan memperkenalkan motif batik Indonesia, seperti Batik Kawung, Parang, dan lainnya, dalam skala nasional. Batik menjadi identitas nasional Indonesia.",
        },
        {
            year: "1970",
            text: "Batik modern mulai berkembang dengan seniman-seniman batik yang menciptakan motif-motif yang lebih eksperimental. Teknik-teknik tradisional digabungkan dengan konsep modern.",
        },
        {
            year: "1980",
            text: "Pemerintah Indonesia mempromosikan batik sebagai aset budaya dan ekonomi nasional. Batik diperkenalkan dalam berbagai pameran internasional dan menjadi simbol kebanggaan bangsa.",
        },
        {
            year: "1990",
            text: "Batik kembali populer di kalangan anak muda. Desainer-desainer muda menciptakan inovasi dengan motif batik untuk busana kasual, menjadikannya tren baru di dunia fashion Indonesia.",
        },
        {
            year: "2000",
            text: "Batik mulai masuk ke dunia digital dengan adanya pelatihan online dan tutorial membatik. Ini mempermudah pelestarian teknik membatik di kalangan generasi muda dan memperkenalkan batik ke skala global.",
        },
        {
            year: "2009",
            text: "UNESCO mengakui Batik Indonesia sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi. Sejak itu, tanggal 2 Oktober diperingati sebagai Hari Batik Nasional di Indonesia.",
        },
        {
            year: "2020",
            text: "Batik beradaptasi di tengah pandemi dengan menjadi produk fashion seperti masker dan pakaian kasual. Ini membantu menjaga relevansi batik di era modern, tetap menjadi bagian dari kehidupan sehari-hari.",
        },
        {
            year: "2024",
            text: (
                <>
                    Lahirnya Kenal Batik, platform interaktif untuk
                    memperkenalkan batik secara modern dengan gamifikasi dan
                    kuis.
                    <br />
                    <br />
                    <span className="text-xs md:text-sm">
                        Keren banget, Kenal Batik siap menorehkan sejarah baru
                        di dunia batik! 🎉{" "}
                    </span>
                </>
            ),
        },
    ];

    return (
        <section>
            <div className="flex justify-center mb-10">
                <div className="bg-[#fef1e2] px-12 py-3 rounded-3xl shadow-2xl text-lg md:text-xl lg:text-2xl lg:px-16 font-sofiasans">
                    Sejarah
                </div>
            </div>

            <div className="text-center font-vidaloka md:mx-0 mx-5">
                <h3 className="text-3xl lg:text-6xl mb-2">
                    Menggali Asal Usul Batik
                </h3>
                <p className="text-xl lg:text-3xl">
                    Dari Warisan Leluhur Hingga Warisan Budaya yang Mendunia.
                </p>
            </div>
            <div className="relative overflow-x-auto scrollbar-hide ml-6 md:ml-10">
                {/* Horizontal timeline line */}
                <div className="relative flex flex-nowrap mr-14 md:mr-40 gap-8 min-w-full w-max z-10">
                    <div className="absolute mx-32 md:ml-44 md:mr-20 top-1/2 left-0 right-0 h-1 bg-black"></div>
                    {timelineData.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-64 flex flex-col justify-end font-vidaloka"
                        >
                            {/* Alternating position (top or bottom) */}

                            {index % 2 === 0 ? (
                                <div className="h-72 w-72 mt-96 md:mt-[430px] md:w-96 md:h-80 lg:ml-3 text-center">
                                    <time className="block text-5xl font-normal lg:text-6xl text-black">
                                        {item.year}
                                    </time>
                                    <p className="mt-2 text-md lg:text-lg">
                                        {item.text}
                                    </p>
                                </div>
                            ) : (
                                <div className="mb-[375px] md:mb-[420px] md:w-96 lg:ml-3 text-center w-72">
                                    <p className="mb-2 text-md lg:text-lg">
                                        {item.text}
                                    </p>
                                    <time className="block text-5xl font-normal lg:text-6xl mb-2 text-black">
                                        {item.year}
                                    </time>
                                </div>
                            )}

                            {/* Circle marker */}
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#FFD79F] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/4 md:translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
