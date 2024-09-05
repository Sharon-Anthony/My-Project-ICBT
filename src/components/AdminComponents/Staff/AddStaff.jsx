import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStaff({ onAddStaff }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });
  const [userId, setUserId] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  useEffect(() => {
    axios.get('http://localhost:8081/staff/count')
      .then(response => {
        const count = response.data;
        const newUserId = `u${String(count + 1).padStart(3, '0')}`;
        setUserId(newUserId);
      })
      .catch(error => console.error('Error fetching user count:', error));
  }, []);

  useEffect(() => {
    if (formData.username) {
      const userId1 = userId;
      const generatedEmail = `${userId1}-${formData.username}-ABCrestaurant@gmail.com`;
      setFormData(prevState => ({ ...prevState, email: generatedEmail }));
    }
  }, [formData.username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      phoneNumber: parseInt(formData.phoneNumber, 10),
    };

    axios.post('http://localhost:8081/staff', dataToSend)
      .then(response => {
        console.log('Staff added successfully:', response.data);
        alert('Staff added successfully:');
        if (onAddStaff) onAddStaff(response.data);
      })
      .catch(error => {
        console.error('There was an error adding the staff:', error);
        alert(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative w-[1000px]">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="John"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="sfs@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Phone number"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaff;
