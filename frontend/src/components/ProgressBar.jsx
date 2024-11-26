const ProgressBar = ({ color, progress }) => {
    const icon = '/icon/' + color.replace('#', '') + '.png';

    return (
        <div className="bg-white bg-opacity-50 flex items-center w-[298px] h-10">
            <div className=" border-r border-black_1 flex items-center justify-center w-[50px] h-full text-lg font-bold">
                {progress}%
            </div>

            <div className="relative flex-grow h-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full transition-all"
                    style={{ width: `${progress}%`, backgroundColor: color }}
                >
                    <img
                        src={icon}
                        alt="icon"
                        className="w-[40px] absolute right-0 top-1/2 -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
