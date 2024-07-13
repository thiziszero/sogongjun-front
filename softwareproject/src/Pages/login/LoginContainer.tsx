import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../Apis/apis"; // API 파일에서 userApi를 import
import LoginPresentation from "./LoginPresentation";

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onLogin = async () => {
    if (!id || !password) {
      setError("아이디/패스워드를 입력해주세요");
    } else {
      setError("");
      try {
        // Login API 호출
        const response = await userApi.login({ nickname: id, password });
        console.log("API 응답 데이터:", response.data);
        navigate("/");
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onCreate = () => {
    navigate("/register");
  }

  const onFindID = () => {
    navigate("/");
  }

  const onFindPassword = () => {
    navigate("/");
  }

  const handleIdChange = (value: string) => {
    setId(value);
    if (error) {
      setError("");
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) {
      setError("");
    }
  }

  return (
    <LoginPresentation 
      id={id}
      setId={handleIdChange}
      password={password}
      setPassword={handlePasswordChange}
      error={error}
      onLogin={onLogin}
      onCreate={onCreate}
      onFindID={onFindID}
      onFindPassword={onFindPassword}
    />
  );
};

export default LoginContainer;
