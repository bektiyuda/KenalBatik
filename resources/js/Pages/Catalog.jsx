import React, { useState } from "react";

function Catalog({ batiks }) {
    const [showData, setShowData] = useState(false); // State untuk mengontrol apakah data ditampilkan

    // Fungsi untuk menangani klik tombol
    const handleShowData = () => {
        setShowData(true); // Ubah state menjadi true untuk menampilkan data
    };

    return (
        <>
            <div>Ini Catalog</div>
            <button onClick={handleShowData}>Tampilkan Data Batik</button>{" "}
            {/* Tombol untuk memunculkan data */}
            {showData && ( // Tampilkan data hanya jika showData === true
                <ul>
                    {batiks.length > 0 ? (
                        batiks.map((batik, index) => (
                            <li key={index}>
                                {batik.name} - {batik.id}{" "}
                                {/* Ganti field sesuai dengan model Batik */}
                            </li>
                        ))
                    ) : (
                        <p>Data batik belum tersedia.</p>
                    )}
                </ul>
            )}
        </>
    );
}

export default Catalog;
