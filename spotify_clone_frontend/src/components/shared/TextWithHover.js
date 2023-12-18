const TextWithHover = ({displayText, active , onClick}) => {
    return (
            <div className="flex items-center justify-start cursor-pointer" onClick={onClick}>
                <div className={`${active ? "text-white" :"text-gray-500"} text-lg font-semibold hover:text-white hover:font-bold transform transition-transform hover:scale-105`}>
                    {displayText}
                </div>
            </div>
    );
};

export default TextWithHover;