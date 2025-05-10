import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 2em;
`;

const AddStudentButton = styled(Link)`
  background-color: #28a745;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  margin-bottom: 30px;
  display: inline-block;
  font-size: 1em;

  &:hover {
    background-color: #1e7e34;
  }
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.delete ? "#dc3545" : "#ffc107")};
  color: white;
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    opacity: 0.8;
  }
`;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const backendURL = "https://wt-assignment-2-3aes.onrender.com";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${backendURL}/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <PageContainer>
      <Title>Student List</Title>
      <AddStudentButton to="/add">Add New Student</AddStudentButton>
      {students.length > 0 ? (
        <Table>
          <TableHead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Year</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.enrollmentYear}</TableCell>
                <TableCell>
                  <ActionButton as={Link} to={`/edit/${student._id}`}>
                    Edit
                  </ActionButton>
                  <ActionButton
                    delete
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No students found.</p>
      )}
    </PageContainer>
  );
};

export default StudentList;
