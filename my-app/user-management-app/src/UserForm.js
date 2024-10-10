import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  // State to store form data and users list
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: ''
  });
  const [users, setUsers] = useState([]);

  // Function to get all users from backend
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    getUsers();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to submit form data and add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/addUser', formData);
      // Clear form after submit
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
      });
      // Fetch updated list of users
      getUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
      getUsers(); // Fetch updated list of users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.phone} - {user.email} - {user.address}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
