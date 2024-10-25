import React, { useState } from 'react'
import { cssClass } from '../../Components/cssModule'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import { BACKEND_API_ENDPOINTS, requestOptions } from '../../Utils/utils'
import { Loader } from '../../Components/Loader'

export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userData = { email };
            const response = await axios.post(`${BACKEND_API_ENDPOINTS}/resetPassword`, userData, requestOptions);
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                setEmail("")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Unexpected Error occurred!!")
            console.error(error.response?.data?.message || "Unexpected Error occurred!!")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <section className="w-full h-auto flex justify-center items-center">
                <div className="w-full min-h-screen flex justify-center items-center">
                    <form onSubmit={handleSubmit} className={`w-[380px] min-h-[250px] bg-white flex flex-col justify-start items-center gap-3 border rounded-3xl`}>
                        <p className='mb-5 mt-5 text-xl font-medium px-7 capitalize'>To reset password Enter your registered email!</p>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className={`${cssClass.inputCss}`} />
                        <button
                            type="submit"
                            className={`relative ${cssClass.buttonCss} ${loading ? "cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <div>
                                    <Loader />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Reset"
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
