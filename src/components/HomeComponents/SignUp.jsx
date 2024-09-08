import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Login from "./Login";
import axios from "axios";
import SuccessMessage from "../Message/SuccessMessage";

const Signup = ({ setShowPopup }) => {
    const [currentForm, setCurrentForm] = useState("signup");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .post("http://localhost:8081/user", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("User added successfully:", response.data);
                    setCurrentForm("login");
                    setShowSuccess(true); 
                    setTimeout(() => {
                      setShowSuccess(false); 
                    }, 3000);
                  })
                  .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: "Email is already in use",
                        }));
                    } else {
                        console.error("Error adding user:", error);
                        alert("Singup Failed");
                    }
                });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginClick = () => {
        setCurrentForm("login");
    };

    const handleClose = () => {
        setShowPopup(false);
    };
    return (
        <>
            {currentForm === "signup" && (
                <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
                    <div className="p-4 shadow-lg bg-white rounded-lg duration-200 w-[400px] max-h-[97vh] overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-extrabold text-gray-800">Sign Up</h1>
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
                                { label: "Username", name: "username", type: "text" },
                                { label: "Email", name: "email", type: "email" },
                                { label: "Password", name: "password", type: "password" },
                                { label: "Confirm Password", name: "confirmPassword", type: "password" },
                                { label: "Address", name: "address", type: "text" },
                                { label: "Phone Number", name: "phoneNumber", type: "text" },
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
                                        className={`w-full rounded-lg border text-black ${
                                            errors[name] ? "border-red-500" : "border-gray-300"
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
                                Sign Up
                            </button>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">Already have an account?</p>
                            <button
                                className="mt-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                                onClick={handleLoginClick}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {currentForm === "login" && <Login setShowPopup={setShowPopup} />}
            {showSuccess && <SuccessMessage message="Signup Successful!" />}
        </>
    );
};

export default Signup;
