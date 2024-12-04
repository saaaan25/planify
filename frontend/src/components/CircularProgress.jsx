const CircularProgress = ({ percentage, size = 120, strokeWidth = 20 }) => {
    // Cálculos
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const entero = Math.round(percentage)

    return (
        <div className="relative">
            <svg
                width={size}
                height={size}
                className="rotate-[-90deg]"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#ff9d9d"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#d47373"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="square"
                />
                
            </svg>
            <div
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="text-2xl font-frankfurter text-black_1">
                    {entero}%
                </span>
            </div>
        </div>
        
    );
};

export default CircularProgress;
