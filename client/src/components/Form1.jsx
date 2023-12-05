import { useState } from "react";
import { useNavigate } from "react-router";
import Stepper from "./Stepper"
import axios from "axios";
import BACKEND from "../../constant";

export default function Form1() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const url = BACKEND;

    function handleSubmit() {
        const config = {
            method: "post",
            url: `${url}/api/v1/user/first-level`,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }

        setLoading(true);
        axios
            .request(config)
            .then(res => {
                console.log(res.data);
                navigate(`/next/${res.data.userId}`);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 flex flex-col justify-center items-center gap-4">
            <Stepper completion={0} />

            <div className="bg-white w-2/4 flex flex-col gap-5 rounded-xl px-10 py-5 font-bold text-lg">
                <input
                    name="name"
                    className="w-full px-10 bg-gray-200 p-2 rounded-xl"
                    placeholder="Enter your Name"
                    value={data.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    className="w-full px-10 bg-gray-200 p-2 rounded-xl"
                    placeholder="Enter your Email"
                    value={data.email}
                    onChange={handleChange}
                />

                <div className="self-center">
                    {
                        loading
                            ? <button className="bg-green-500 text-white px-10 py-2 rounded-xl" disabled>Loading...</button>
                            : <button className="bg-green-500 text-white px-10 py-2 rounded-xl" onClick={handleSubmit}>Next</button>
                    }
                </div>
            </div>
        </div>
    );
}