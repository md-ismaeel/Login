import React, { useState } from "react";
import axios from "axios";
import { toast } from "material-react-toastify";
import { BACKEND_API_ENDPOINTS, requestOptions } from "../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { cssClass } from "../../Components/cssModule";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isEye, setIsEye] = useState(false)
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  function resetForm() {
    setUserData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_API_ENDPOINTS}/register`,
        userData,
        requestOptions
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        resetForm();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(
        error.response?.data?.message || "Unexpected Error Occurred!!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto flex justify-center items-center">
      <div className="w-full min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className={`relative ${cssClass.registerFormCss}`}>
          <div className={cssClass.registerAndLoginCss}>Registration Form</div>
          <input
            type="text"
            value={userData.userName}
            onChange={handleChange}
            name="userName"
            placeholder="UserName"
            className={`${cssClass.inputCss}`}
          />
          <input
            type="text"
            value={userData.email}
            onChange={handleChange}
            name="email"
            placeholder="Email Address"
            className={cssClass.inputCss}
          />

          <input
            type={isEye ? "text" : "password"}
            value={userData.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            className={cssClass.inputCss}
          />
          <span onClick={() => setIsEye((prev) => !prev)} className="eyes-1 absolute bottom-[10.4rem] right-[5rem] text-xl text-slate-600 cursor-pointer">{isEye ? <FaEye /> : <FaEyeSlash />}</span>
          <input
            type="text"
            value={userData.mobileNumber}
            onChange={handleChange}
            name="mobileNumber"
            placeholder="Mobile Number"
            className={cssClass.inputCss}
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
              "Submit"
            )}
          </button>
          <p className="acc text-xm">
            Already have an account?
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline mb-5 ml-2"
            >
              Login Now!
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
