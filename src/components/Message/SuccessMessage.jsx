// SuccessMessage.jsx
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SuccessMessage = ({ message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-sm mx-auto">
                <div className="flex items-center justify-center text-green-500 mb-4 animate-bounce">
                    <IoCheckmarkCircleOutline className="text-9xl" />
                </div>
                <h2 className="text-5xl font-semibold text-gray-800 text-center">{message}</h2>
            </div>
        </div>
    );
};

export default SuccessMessage;
