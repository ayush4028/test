export default function Stepper(props) {
    const { completion } = props;
    return (
        <div
            className={`
                relative h-4 w-2/4 rounded-2xl bg-gradient-to-r transition-all duration-300 
                ${completion === 0 && 'from-white to-white'}
                ${completion === 40 && 'from-black to-white from-40% to-40%'}
                ${completion === 20 && 'from-black to-white from-20% to-20%'}
                ${completion === 60 && 'from-black to-white from-60% to-60%'}
                ${completion === 80 && 'from-black to-white from-80% to-80%'}
                ${completion === 100 && 'from-black to-black'}
            `}
        >
            <span
                className={`
                    absolute bottom-4 font-bold 
                    ${completion === 0 && 'left-0'}
                    ${completion === 20 && 'left-[20%]'}
                    ${completion === 40 && 'left-[40%]'}
                    ${completion === 60 && 'left-[60%]'}
                    ${completion === 80 && 'left-[80%]'}
                    ${completion === 100 && 'right-0'}
                `}
            >
                {completion}%
            </span>
        </div>
    );
}