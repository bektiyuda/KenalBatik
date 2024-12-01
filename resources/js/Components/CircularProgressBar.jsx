import React from "react";

const CircularProgressBar = ({ accuracy }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = (accuracy / 100) * circumference;

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
                    stroke="#e4666c"
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
                    {accuracy}%
                </text>
            </svg>
        </div>
    );
};

export default CircularProgressBar;
