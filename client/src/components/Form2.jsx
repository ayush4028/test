import { useState, useEffect } from 'react';
import Stepper from './Stepper';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import BACKEND from '../../constant';

export default function Form1() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [completion, setCompletion] = useState();

    const [data, setData] = useState({
        address: '',
        phoneNumber: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleFile(e) {
        const file = e.target.files[0];
        console.log(file);  
        if(file === undefined) {
            return;
        }

        setData((prevData) => ({
            ...prevData,
            image: file ? file : '',
        }));
    }

    const url = BACKEND;
    const formData = new FormData();
    formData.append('address', data.address);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('file', data.image);

    function handleSubmit() {
        const config = {
            method: 'post',
            url: `${url}/api/v1/user/second-level/${id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        setLoading(true);
        axios
            .request(config)
            .then((res) => {
                console.log(res.data);
                navigate(`/success/${id}`)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));

        alert('Form submitted successfully')
    }

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

            <div className="bg-white w-2/4 flex flex-col gap-5 rounded-xl px-10 py-5 font-bold text-lg">
                <input
                    name="address"
                    className="w-full px-10 bg-gray-200 p-2 rounded-xl"
                    placeholder="Enter your Address"
                    value={data.address}
                    onChange={handleChange}
                />
                <input
                    name="phoneNumber"
                    className="w-full px-10 bg-gray-200 p-2 rounded-xl"
                    placeholder="Enter your Phone Number"
                    value={data.phone}
                    onChange={handleChange}
                />
                <input
                    name="image"
                    className="w-full px-10 bg-gray-200 p-2 rounded-xl"
                    defaultValue={data.image}
                    type="file"
                    id="file"
                    onChange={handleFile}
                />

                <div className="self-center">
                    {loading ? (
                        <button
                            className="bg-green-500 text-white px-10 py-2 rounded-xl"
                            disabled
                        >
                            Loading...
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-10 py-2 rounded-xl"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
