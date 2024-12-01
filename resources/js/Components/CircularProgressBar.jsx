import React from "react";

const CircularProgressBar = ({ accuracy }) => {
    const radius = 45; // Radius lingkaran
    const circumference = 2 * Math.PI * radius; // Keliling lingkaran

    // Pastikan nilai `accuracy` valid (angka) dan di dalam rentang 0 - 100
    const validAccuracy =
        isNaN(accuracy) || accuracy < 0 ? 0 : Math.min(accuracy, 100);
    const progress = (validAccuracy / 100) * circumference;

    return (
        <div className="flex justify-center items-center">
            <svg
                className="relative w-44 h-44 md:w-56 md:h-56 lg:w-50 lg:h-50"
                viewBox="0 0 100 100"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#6A5AE0"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-2xl font-bold items-center"
                    fill="#000000"
                >
                    {validAccuracy}%
                </text>
            </svg>
        </div>
    );
};

export default CircularProgressBar;
