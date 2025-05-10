import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled(Link)`
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  &.edit {
    background-color: #007bff;
    color: white;
  }

  &.delete {
    background-color: #dc3545;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;

const AddNewButton = styled(Link)`
  display: block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 16px;

  &:hover {
    background-color: #1e7e34;
  }
`;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL; // Get the backend URL

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/students`); // Use the environment variable
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${backendURL}/api/students/${id}`); // Use the environment variable
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <Container>
      <Title>Student List</Title>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.phone}</Td>
              <Td>
                <ActionButton to={`/edit/${student._id}`} className="edit">
                  Edit
                </ActionButton>
                <DeleteButton
                  onClick={() => handleDelete(student._id)}
                  className="delete"
                >
                  Delete
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddNewButton to="/add">Add New Student</AddNewButton>
    </Container>
  );
};

export default StudentList;
