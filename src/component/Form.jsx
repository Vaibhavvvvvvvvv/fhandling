import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import { AES } from 'crypto-js';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Form = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.tableData);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showData, setShowData] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data
      await validationSchema.validate(formData, { abortEarly: false });

      setShowData(true);

      // Encrypt the password before storing it
      const encryptedPassword = AES.encrypt(formData.password, 'secret-key').toString();
      const newData = { ...formData, password: encryptedPassword };

      console.log('Form submitted:', newData);
      dispatch({ type: 'ADD_DATA', payload: newData });

      // Reset the form data and hide the submitted data
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setShowData(false);
      setErrors({});
    } catch (error) {
      // Handle validation errors
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>Employee Entry</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div  className="text-danger">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {showData && (
        <div>
          <h2>Submitted Data:</h2>
          <p>Username: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}

      <Table data={tableData} />
    </div>
  );
};

export default Form;
