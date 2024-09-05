import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import UserPopup from './UserPopup';

function User() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    
    const totalPages = Math.ceil(users.length / usersPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const searchTermStr = searchTerm.toString(); 
    
        const userIdMatch = typeof user.userId === 'string' && user.userId.toLowerCase().includes(lowerSearchTerm);
        const usernameMatch = typeof user.username === 'string' && user.username.toLowerCase().includes(lowerSearchTerm);
        const emailMatch = typeof user.email === 'string' && user.email.toLowerCase().includes(lowerSearchTerm);
        const passwordMatch = typeof user.password === 'string' && user.password.toLowerCase().includes(lowerSearchTerm);
        const phoneNumberMatch = typeof user.phoneNumber === 'number' && user.phoneNumber.toString().includes(searchTermStr);
        const addressMatch = typeof user.address === 'string' && user.address.toLowerCase().includes(lowerSearchTerm);
    
        return userIdMatch || usernameMatch || emailMatch || passwordMatch || phoneNumberMatch || addressMatch;
    });
    
    
    const navigate = useNavigate();

    const handleEditClick = (user) => {
        navigate('/updateuser', { state: { user } });
    };

    useEffect(() => {
        axios.get("http://localhost:8081/user")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setUsers(response.data); // Update state with fetched data
                }
            })
            .catch((error) => {
                console.log("No users:", error);
            });
    }, []);

    const handleVisibilityClick = (user) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };


    return (
        <div className='h-screen pt-10 relative w-[1000px]'>
            <div className="flex items-center space-x-2 justify-end mt-10 ">
                <div className="relative flex">
                    <input
                        type="text"
                        className="w-full max-w-xs rounded-md px-2 py-2 text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-md flex items-center justify-center"
                    >
                        <BiSearch />
                    </button>
                </div>
                <div>
                    <button
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                        onClick={() => navigate('/adduser')} // Navigate to /adduser on click
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="overflow-auto mt-3">
                <table className="min-w-full bg-gray-800 text-gray-400">
                    <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                        <tr>
                            <th className="p-3 text-left">User ID</th>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Password</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Phone Number</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredUsers.slice(indexOfFirstUser, indexOfLastUser).map((user, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-3 font-bold">{user.userId}</td>
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.password}</td>
                                <td className="p-3">{user.address}</td>
                                <td className="p-3">{user.phoneNumber}</td>
                                <td className="p-3 flex space-x-2">
                                    <a href="#" onClick={() => handleVisibilityClick(user)} className="text-gray-400 hover:text-gray-100 inline-flex items-center">
                                        <span className="material-icons-outlined text-[25px] leading-none">visibility</span>
                                    </a>
                                    <button
                                        className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2 p-0 bg-transparent border-none"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        <span className="material-icons-outlined text-[25px] leading-none">edit</span>
                                    </button>
                                    <a href="#" className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
                                        <span className="material-icons-round text-[25px] leading-none">delete_outline</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={`px-3 py-1 ${currentPage === number ? 'bg-gray-600 text-gray-100' : 'bg-gray-700 text-gray-400'} rounded hover:bg-gray-600`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={indexOfLastUser >= users.length}
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedUser && (
                <UserPopup user={selectedUser} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default User;
//here the component is not fixed when the table is empty it goes to half the screen accutally the width is not fixed