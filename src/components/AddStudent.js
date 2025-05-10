import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 2em;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const backendURL = "https://wt-assignment-2-3aes.onrender.com"; // EXACT CHANGE HERE

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = {
        studentId,
        firstName,
        lastName,
        email,
        department,
        enrollmentYear: parseInt(enrollmentYear),
        dateOfBirth,
        isActive,
      };
      await axios.post(`${backendURL}/api/students`, newStudent); // EXACT CHANGE HERE
      navigate("/students"); // Redirect to student list after adding
    } catch (error) {
      console.error("Error adding student:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Add New Student</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="department">Department (Optional)</Label>
            <Input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="enrollmentYear">Enrollment Year</Label>
            <Input
              type="number"
              id="enrollmentYear"
              value={enrollmentYear}
              onChange={(e) => setEnrollmentYear(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth (YYYY-MM-DD)</Label>
            <Input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="isActive">Active</Label>
            <Input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </FormGroup>
          <Button type="submit">Add Student</Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddStudent;
