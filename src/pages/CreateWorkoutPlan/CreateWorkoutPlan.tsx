import React from "react";
import styled, { ThemeProvider } from "@xstyled/styled-components";

// Define styled components corresponding to your HTML structure
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  justify-content: space-between;
  overflow-x: hidden;
  font-family: "Lexend", "Noto Sans", sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 16px 0;
  padding-bottom: 8px;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #111418;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const Title = styled.h2`
  color: #111418;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
  flex: 1;
  letter-spacing: -0.015em;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #111418;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  height: 48px;
  max-width: 480px;
  padding: 0;
  gap: 8px;
  cursor: pointer;
  min-width: 0;
  overflow: hidden;
`;

// Define more styled components for rest of the structure...

const InputWrapper = styled.div`
  display: flex;
  max-width: 480px;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  padding: 12px 16px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  flex: 1;
`;

const InputField = styled.input`
  flex: 1;
  width: 100%;
  background-color: #f0f2f4;
  border-radius: 12px;
  height: 56px;
  padding: 16px;
  font-size: 16px;
  color: #111418;
  border: none;
  outline: none;

  ::placeholder {
    color: #637488;
  }
`;

const SectionTitle = styled.h3`
  color: #111418;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: -0.015em;
  padding: 16px;
`;

const ExerciseContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: white;
  padding: 8px 16px;
  min-height: 72px;
  justify-content: space-between;
`;

const ExerciseDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ExerciseName = styled.p`
  color: #111418;
  font-size: 16px;
  font-weight: medium;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExerciseSets = styled.p`
  color: #637488;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SaveTemplateButton = styled.button`
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  height: 48px;
  padding: 0 20px;
  flex: 1;
  background-color: #1979e6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
`;

const PaddingBlock = styled.div`
  height: 20px;
  background-color: white;
`;

export const CreateWorkoutPlan = () => {
  return (
    <Container>
      <div>
        <HeaderContainer>
          <IconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </IconWrapper>
          <Title>New Template</Title>
          <SaveButton>
            <IconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </IconWrapper>
          </SaveButton>
        </HeaderContainer>

        <InputWrapper>
          <InputLabel>
            <p
              style={{
                color: "#111418",
                fontSize: "16px",
                fontWeight: "medium",
                lineHeight: "normal",
                paddingBottom: "8px",
              }}
            >
              Name
            </p>
            <InputField placeholder="Legs" value="" />
          </InputLabel>
        </InputWrapper>

        <SectionTitle>Add exercises</SectionTitle>

        <ExerciseContainer>
          <ExerciseDetail>
            <ExerciseName>Squat</ExerciseName>
            <ExerciseSets>1 set</ExerciseSets>
          </ExerciseDetail>
          <IconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </IconWrapper>
        </ExerciseContainer>

        {/* Repeat for other exercises */}
        <ExerciseContainer>
          <ExerciseDetail>
            <ExerciseName>Leg Press</ExerciseName>
            <ExerciseSets>3 sets</ExerciseSets>
          </ExerciseDetail>
          <IconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </IconWrapper>
        </ExerciseContainer>

        <ExerciseContainer>
          <ExerciseDetail>
            <ExerciseName>Lunges</ExerciseName>
            <ExerciseSets>4 sets, 2 supersets</ExerciseSets>
          </ExerciseDetail>
          <IconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </IconWrapper>
        </ExerciseContainer>
      </div>

      <div>
        <div style={{ display: "flex", padding: "12px 16px" }}>
          <SaveTemplateButton>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Save template
            </span>
          </SaveTemplateButton>
        </div>
        <PaddingBlock />
      </div>
    </Container>
  );
};
