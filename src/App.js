import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import HomePage from "./components/HomePage";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
    color: #333;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  background: linear-gradient(
    90deg,
    #2c3e50,
    #4ca1af
  ); /* Beautiful dark cyan gradient */
  color: white;
  padding: 15px 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #e0f7fa;
  }
`;

const Title = styled.h1`
  margin-right: auto;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Footer = styled.div`
  background-color: #333;
  color: #eee;
  padding: 10px 20px;
  text-align: right;
  font-size: 0.8em;
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navbar>
          <Title>Student Hub</Title>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/students">Student List</NavLink>
          <NavLink to="/add">Add Student</NavLink>
        </Navbar>
        <div
          style={{
            flexGrow: 1,
            background: "linear-gradient(180deg, #e0f7fa, #f4f7f6)",
          }}
        >
          {" "}
          {/* Page Gradient */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
          </Routes>
        </div>
        <Footer>Project done by 160123733121 - Sushant</Footer>
      </AppContainer>
    </Router>
  );
};

export default App;
