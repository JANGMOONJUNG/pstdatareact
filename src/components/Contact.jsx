import React, { useState } from "react";
import styled from "styled-components";

const ContainerStatus = styled.div`
  display: flex;
  height: 760px;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 40px;

  background-color: #e9e9e9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1440px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  align-items: center;

  box-sizing: border-box;

  background-color: #ffffff;

  border-radius: 16px;

  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: blue;
`;

const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const UserDepartment = styled.span`
  font-weight: 700;
`;

const UserNameAndNumber = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const UserName = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

const UserNumber = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #555;
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 920px;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 240px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Contact = () => {
  const profiles = [
    {
      EMP_NO: "2053940",
      NAME_KOR: "장문정",
      DEPT_NAME_KOR: "DRAM개발PI품질&수율",
    },
    {
      EMP_NO: "2053940",
      NAME_KOR: "테스트1",
      DEPT_NAME_KOR: "DRAM개발PI품질&수율",
    },
    {
      EMP_NO: "2053940",
      NAME_KOR: "테스트2",
      DEPT_NAME_KOR: "DRAM개발PI품질&수율",
    },
    {
      EMP_NO: "2053940",
      NAME_KOR: "테스트3",
      DEPT_NAME_KOR: "DRAM개발PI품질&수율",
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    // Add your email sending logic here (e.g., API call)
    alert(
      `Email sent to: ${selectedUser.NAME_KOR}\nSubject: ${emailSubject}\nBody: ${emailBody}`
    );
    setEmailSubject("");
    setEmailBody("");
  };

  return (
    <ContainerStatus>
      <Content>
        <Container>
          <h2 style={{ textAlign: "center" }}>관리자</h2>
          <div style={{ display: "flex", gap: "16px" }}>
            {profiles.map((profile, index) => (
              <UserInfo key={index} onClick={() => handleUserClick(profile)}>
                <UserImage src={""} alt="User Photo" />
                <UserDetailContainer>
                  <UserDepartment>{profile.DEPT_NAME_KOR}</UserDepartment>
                  <UserNameAndNumber>
                    <UserName>{profile.NAME_KOR}</UserName>
                    <UserNumber>{profile.EMP_NO}</UserNumber>
                  </UserNameAndNumber>
                </UserDetailContainer>
              </UserInfo>
            ))}
          </div>

          {selectedUser && (
            <EmailForm onSubmit={handleSendEmail}>
              <h3>Send Email to {selectedUser.NAME_KOR}</h3>
              <Input
                type="text"
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                required
              />
              <TextArea
                placeholder="Email Body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                required
              />
              <Button type="submit">Send Email</Button>
            </EmailForm>
          )}
        </Container>
      </Content>
    </ContainerStatus>
  );
};

export default Contact;
