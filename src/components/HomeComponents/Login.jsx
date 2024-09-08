import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Signup from "./SignUp";
import SuccessMessage from "../Message/SuccessMessage";

const Login = ({ setShowPopup, onLogin }) => {
    const [currentForm, setCurrentForm] = useState("login");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8081/checkSession", {
            withCredentials: true,
        })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    onLogin(response.data);
                    setShowPopup(false);
                }
            })
            .catch((error) => {
                console.log("No active session:", error);
            });
    }, [onLogin, setShowPopup]);

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignupClick = () => {
        setCurrentForm("signup");
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post("http://localhost:8081/login", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
                .then((response) => {
                    console.log("User logged in successfully:", response.data);
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        setShowPopup(false);
                        onLogin(response.data);
                    }, 1900);
                })
                .catch((error) => {
                    console.error("Error logging in:", error);
                    setErrors({ general: "Invalid credentials or server error" });
                });
        }
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="p-4 shadow-lg bg-white rounded-lg duration-200 w-[400px] max-h-[97vh] overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-extrabold text-gray-800">Login</h1>
                    <IoCloseOutline
                        className="text-4xl cursor-pointer hover:text-gray-600 mb-5"
                        onClick={handleClose}
                        style={{
                            color: "black",
                            backgroundColor: "#ffffff",
                            padding: "2px",
                            borderRadius: "50%",
                        }}
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={`Enter ${label}`}
                                className={`w-full rounded-lg border text-black ${errors[name] ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2`}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                    
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:from-yellow-600 hover:to-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                    <div className="mt-4">
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => alert("Password recovery process here")}
                        >
                            Forgot Password?
                        </button>
                    </div>
                    {errors.general && (
                        <p className="text-red-500 text-1xl mt-1 text-center">{errors.general}</p>
                    )}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        className="mt-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                        onClick={handleSignupClick}
                    >
                        Sign Up
                    </button>

                </div>
                {currentForm === "signup" && (
                    <Signup setShowPopup={setShowPopup} />
                )}
                {showSuccess && <SuccessMessage message="Login Success!" />}
            </div>
        </div>
    );
};

export default Login;
