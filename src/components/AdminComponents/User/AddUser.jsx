import { Select } from '@material-tailwind/react';
import React, { useState } from 'react';


function AddUser({onAddUser}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phoneNumber: '',
    nic: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddUser(formData); // Pass form data to the parent component
  }
//u just forget everything keep it in ur mind this is my user
  return (
    <div className="max-w-2xl mx-auto bg-white p-5">
      <form onSubmit={handleSubmit}>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Name</label>
            <input type="text" 
            id="username" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="John" 
            value={formData.username} 
            onChange={handleChange} required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="text" id="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="sfs@gmail.com" 
            value={formData.email} 
            onChange={handleChange} required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" id="password" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="password" 
            value={formData.password} 
            onChange={handleChange} required />
          </div>  
          <div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
  <select id="role"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    value={formData.role}
    onChange={handleChange}
    required
  >
    <option value="">Select Role</option>
    <option value="admin">admin</option>
    <option value="staff">staff</option>
    <option value="user">user</option>
  </select>
</div>

          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
            <input type="text" id="address" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Address" 
            value={formData.address} 
            onChange={handleChange} required />
          </div>

          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phonenumber</label>
            <input type="text" id="phoneNumber" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="phonenumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nic</label>
            <input type="text" id="nic" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="nic" 
            value={formData.nic} 
            onChange={handleChange} required />
          </div>

        <button type="submit" 
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       
        >    
        Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
//