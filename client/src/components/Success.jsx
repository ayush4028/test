import Confetti from 'react-confetti'
import Stepper from './Stepper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function Success() {
    const { id } = useParams();
    const [completion, setCompletion] = useState();

    const url = 'http://localhost:9041';
    useEffect(() => {
        const config = {
            method: 'get',
            url: `${url}/api/v1/user/get/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .request(config)
            .then((res) => {
                setCompletion(res.data.percentage);
            })
            .catch((err) => console.log(err));
    }, [id])

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 flex flex-col justify-center items-center gap-4">
            <Stepper completion={completion} />

            <div className="bg-white w-2/4 h-1/3 flex flex-col gap-5 rounded-xl px-10 py-5">
                <Confetti />
                <h1 className="text-3xl font-bold text-center">Form submitted successfully</h1>
                <p className="text-center">You will be contacted soon</p>
            </div>
        </div>
    );
}