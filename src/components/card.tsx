

interface CardProps{
    Image: string;
}

const Card = ({ Image }: CardProps) => {
    return (
        <div className="flex justify-center">
            <div className="h-[40vh] w-[20vw] bg-gray-400 rounded-t-lg overflow-hidden">
                <div className="h-[25vh] w-full">
                    <img src={Image} alt="Image" />
                </div>
            </div>
        </div>
    );
};

export default Card;
