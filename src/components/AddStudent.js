import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
  text-align: center;
`;

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const backendURL = process.env.REACT_APP_BACKEND_URL; // Get the backend URL from environment variables

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const newStudent = { name, email, phone };

    try {
      await axios.post(`${backendURL}/api/students`, newStudent); // Use the environment variable
      setSuccessMessage("Student added successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setTimeout(() => navigate("/students"), 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrorMessage("Failed to add student. Please try again.");
        console.error("Error adding student:", error);
      }
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Container>
      <Title>Add New Student</Title>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Label htmlFor="phone">Phone:</Label>
        <Input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

        <Button type="submit">Add Student</Button>
      </Form>
      <BackLink to="/students">Back to Student List</BackLink>
    </Container>
  );
};

export default AddStudent;
