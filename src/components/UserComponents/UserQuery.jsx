import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
//import StaffPopup from './StaffPopup';

function Query() {
    const [queries, setQueries] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const queriesPerPage = 5; // Corrected variable name to be more descriptive

    const indexOfLastQuery = currentPage * queriesPerPage;
    const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
    const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
    const [filteredQueries, setFilteredQueries] = useState([]);
    
    const totalPages = Math.ceil(queries.length / queriesPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user found, redirecting to login...");
        }
    }, []);

    useEffect(() => {
        if (user) {
            const filtered = queries.filter(query  =>
                query.email === user.email &&
                (query.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                query.response.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredQueries(filtered);
        }
    }, [queries, user, searchTerm]);

    

    const navigate = useNavigate();

    const handleEditClick = (query) => {
        navigate('/update-user-query-list', { state: { query: query } }); 
    };

    const handleDeleteClick = (queryId) => {
        
        if (window.confirm("Are you sure you want to delete this query?")) {
            axios.delete(`http://localhost:8081/query/${queryId}`)
                .then(() => {
                    alert("Query deleted successfully!");
                    setQueries(queries.filter(query => query.queryId !== queryId));
                })
                .catch((error) => {
                    console.error("There was an error deleting the query:", error);
                    alert("Failed to delete query. Please try again.");
                });
        }
    };
    


    useEffect(() => {
        axios.get("http://localhost:8081/query")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setQueries(response.data); 
                }
            })
            .catch((error) => {
                console.log("No Queries:", error);
            });
    }, []);

    const handleVisibilityClick = (query) => {
        setSelectedQuery(query);
    };

    const handleClosePopup = () => {
        setSelectedQuery(null);
    };

    return (
        <div className='h-screen pt-10 relative w-[1000px]'>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Query</h1>
            <div className="flex items-center space-x-2 justify-end mt-10">
                
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
            </div>

            <div className="overflow-auto mt-3">
                <table className="min-w-full bg-gray-800 text-gray-400">
                    <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                        <tr>
                            <th className="p-3 text-left">Query ID</th>
                            <th className="p-3 text-left">Service Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Query</th>
                            <th className="p-3 text-left">Response</th>
                            <th className="p-3 text-left">Actions</th> {/* Added Actions column */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredQueries.map((query, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-3 font-bold">{query.queryId}</td>
                                <td className="p-3">{query.serviceName}</td>
                                <td className="p-3">{query.email}</td>
                                <td className="p-3">{query.query}</td>
                                <td className="p-3">{query.response}</td>
                                <td className="p-3 flex space-x-2">
                                    <a href="#" onClick={() => handleVisibilityClick(query)} className="text-gray-400 hover:text-gray-100 inline-flex items-center">
                                        <span className="material-icons-outlined text-[25px] leading-none">visibility</span>
                                    </a>
                                    <button
                                        className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2 p-0 bg-transparent border-none"
                                        onClick={() => handleEditClick(query)}
                                    >
                                        <span className="material-icons-outlined text-[25px] leading-none">edit</span>
                                    </button>
                                    <a href="#"
                                     onClick={() => handleDeleteClick(query.queryId)}
                                    className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
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
                        disabled={indexOfLastQuery >= queries.length}
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedQuery && (
                <StaffPopup query={selectedQuery} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Query;
//now do the same thing here also for the deletion