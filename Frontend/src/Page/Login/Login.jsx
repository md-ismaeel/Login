import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cssClass } from "../../Components/cssModule";
import { toast } from "material-react-toastify";
import { BACKEND_API_ENDPOINTS, requestOptions } from "../../Utils/utils";
import { setIsLogin, setUser } from "../../Redux/Slice/userSlice";
import { Loader } from "../../Components/Loader";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const { user, isLogin } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isEye, setIsEye] = useState(false)
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userName: "",
        password: "",
    });

    function resetForm() {
        setUserData({
            userName: "",
            password: "",
        });
    }

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let identifier;
            const { userName, password } = userData;
            if (userName.includes("@")) {
                identifier = { email: userName };
            } else if (/^\d+$/.test(userName)) {
                identifier = { mobileNumber: userName };
            } else {
                identifier = { userName: userName };
            }
            const reqData = { ...identifier, password };
            // console.log(reqData);

            const response = await axios.post(
                `${BACKEND_API_ENDPOINTS}/login`,
                reqData,
                requestOptions
            );
            // console.log(response.data);

            if (response?.data?.success) {
                dispatch(setIsLogin(true));
                dispatch(setUser(response?.data?.user))
                toast.success(response?.data?.message);
                resetForm();
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.error(
                error.response?.data?.message || "Unexpected Error Occurred!!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full h-auto flex justify-center items-center">
            <div className="w-full min-h-screen flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className={`relative ${cssClass.loginFormCss}`}
                >
                    <div className={cssClass.registerAndLoginCss}>Login</div>
                    <input
                        type="text"
                        value={userData.userName}
                        onChange={handleChange}
                        name="userName"
                        placeholder="UserName & Email & Mobile Number"
                        className={`${cssClass.inputCss}`}
                    />

                    <input
                        type={isEye ? "text" : "password"}
                        value={userData.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        className={cssClass.inputCss}
                    />
                    <span onClick={() => setIsEye((prev) => !prev)} className="eyes absolute bottom-[11.2rem] right-16 text-xl text-slate-600 cursor-pointer">{isEye ? <FaEye /> : <FaEyeSlash />}</span>
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
                            "Login"
                        )}
                    </button>
                    <button onClick={() => navigate("/resetPassword")} className={cssClass.forgetBtnCss}>Forget password?</button>
                    <p className="text-[16px] mt-2 mb-2">
                        {" "}
                        Haven't an account?
                        <button
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:underline mb-2 mt-5 ml-2"
                        >
                            Register Now!
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
}
