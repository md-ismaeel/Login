import React, { useState } from "react";
import { cssClass } from "../../Components/cssModule";
import { Loader } from "../../Components/Loader";
import axios from "axios";
import { BACKEND_API_ENDPOINTS, requestOptions } from "../../Utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "material-react-toastify";

export default function NewPassword() {
    const [newPassword, seNewPassword] = useState("");
    console.log(newPassword);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = { newPassword }
            const response = await axios.post(
                `${BACKEND_API_ENDPOINTS}/resetPassword/${token}`,
                userData,
                requestOptions,
            );

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate("/")
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unexpected Error Occurred!!"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="w-full h-auto flex justify-center items-center">
                <div className="w-full min-h-screen flex justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className={`w-[400px] min-h-[250px] bg-white flex flex-col justify-start items-center gap-2 border rounded-3xl`}
                    >
                        <p className="mb-5 mt-10 text-xl capitalize font-medium">
                            set new password
                        </p>
                        <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => seNewPassword(e.target.value)}
                            placeholder="Email Address"
                            className={`${cssClass.inputCss}`}
                        />
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
                                "Save"
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
