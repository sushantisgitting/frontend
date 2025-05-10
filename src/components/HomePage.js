import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 60px);
  text-align: center;
  background: transparent;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 40px;
  justify-content: center;
`;

const FeatureBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 20px;
  color: #007bff;
  font-size: 1.8em;
  font-weight: 700;
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.7;
`;

const ViewStudentsButton = styled(Link)`
  background: linear-gradient(135deg, #6a1b9a, #e3f2fd);
  color: white;
  padding: 15px 35px;
  border: none;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #4a148c, #b3e5fc);
    transform: scale(1.05);
  }
`;

const HomePage = () => {
  return (
    <PageContainer>
      <h1>Our Features</h1>
      <p style={{ fontSize: "1.1em", color: "#777" }}>
        Explore the capabilities of our student management system.
      </p>
      <FeaturesContainer>
        <FeatureBox>
          <FeatureTitle>🧑‍🎓 Manage Students</FeatureTitle>
          <FeatureDescription>
            Effortlessly add, view, edit, and remove student records with an
            intuitive interface.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox>
          <FeatureTitle>🗂️ Organized Information</FeatureTitle>
          <FeatureDescription>
            Keep all essential student details in one secure and easily
            accessible place.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox>
          <FeatureTitle>🚀 Easy Navigation</FeatureTitle>
          <FeatureDescription>
            Navigate through the system seamlessly with a clear and
            user-friendly design.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>
      <ViewStudentsButton to="/students">View Student List</ViewStudentsButton>
    </PageContainer>
  );
};

export default HomePage;
