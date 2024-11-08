import { useState } from "react";


const Counter = () => {
    const [counter, setCounter] = useState<number>(0)

    const increaseCounter = () => {
        setCounter(counter + 1)
        // console.log(counter);

    }

    const decreaseCounter = () => {

        if (counter > 0) {
            setCounter(counter - 1)
        } else {
            return
        }
        // console.log(counter);


    }



    return (
        <div className="flex space-x-4 items-center">
            <button className="px-5 py-2 bg-green-400 text-2xl text-white rounded-lg"
                onClick={increaseCounter}
            >+</button>
            <h1 className="text-xl text-white">{counter}</h1>
            <button className="px-5 py-2 bg-red-400 text-2xl rounded-lg text-white"
                onClick={decreaseCounter}
            >-</button>
        </div>
    );
}

export default Counter;
