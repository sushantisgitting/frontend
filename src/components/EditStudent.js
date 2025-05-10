import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    enrollmentYear: "",
    dateOfBirth: "",
    isActive: true,
  });
  const backendURL = "https://wt-assignment-2-3aes.onrender.com";

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student for edit:", error);
        // Optionally display an error message to the user
      }
    };

    fetchStudent();
  }, [id, backendURL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${backendURL}/api/students/${id}`, student);
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Edit Student</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              type="text"
              id="studentId"
              name="studentId"
              value={student.studentId}
              onChange={handleChange}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="department">Department (Optional)</Label>
            <Input
              type="text"
              id="department"
              name="department"
              value={student.department}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="enrollmentYear">Enrollment Year</Label>
            <Input
              type="number"
              id="enrollmentYear"
              name="enrollmentYear"
              value={student.enrollmentYear}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth (YYYY-MM-DD)</Label>
            <Input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={
                student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : ""
              }
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="isActive">Active</Label>
            <Input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={student.isActive}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Update Student</Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default EditStudent;
