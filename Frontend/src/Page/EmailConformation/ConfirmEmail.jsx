import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_API_ENDPOINTS, requestOptions } from '../../Utils/utils';
import { toast } from 'material-react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConfirmEmail() {
    const [loading, setLoading] = useState(false);
    const [isTrue, setIsTrue] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const fetchConformationEmail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINTS}/confirmEmail/${token}`, requestOptions);
                if (response?.data?.success) {
                    toast.success(response?.data?.message);
                    navigate("/");
                    setIsTrue(true);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Unexpected Error Occurred!!");
                console.error(error.response?.data?.message || "Unexpected Error Occurred!!");
            } finally {
                setLoading(false);
            }
        };
        fetchConformationEmail();
    }, [token]);

    return (
        <div className='text-2xl font-medium flex justify-center items-center w-full h-[200px]'>
            {loading ? "Verifying..." : (isTrue ? "Your Email is verified! You can now login!" : "Your email is not verified. Please try again.")}
        </div>
    );
}
