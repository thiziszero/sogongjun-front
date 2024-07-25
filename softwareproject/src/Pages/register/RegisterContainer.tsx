import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import RegisterPresentation from "./RegisterPresentation";
import { userApi } from "../../Apis/apis";

const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const context = useAppContext();

  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [grade, setGrade] = useState<number | undefined>();
  const [error, setError] = useState<string>("");

  const onRegister = async () => {
    if (!nickname || !password || !nationality || !grade) {
      setError("모든 필드를 입력해주세요");
    } else {
      try {
        const response = await userApi.register({
          nickname,
          password,
          nationality,
          grade,
        });
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const clickImage = () => {
    navigate(-1);
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) {
      setError("");
    }
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (error) {
      setError("");
    }
  };

  const handleNationalityChange = (value: string) => {
    setNationality(value);
    if (error) {
      setError("");
    }
  };

  const handleGradeChange = (value: number) => {
    setGrade(value);
    if (error) {
      setError("");
    }
  };

  return (
    <RegisterPresentation
      password={password}
      setPassword={handlePasswordChange}
      nickname={nickname}
      setNickname={handleNicknameChange}
      nationality={nationality}
      setNationality={handleNationalityChange}
      grade={grade}
      setGrade={handleGradeChange}
      error={error}
      onRegister={onRegister}
      clickImage={clickImage}
    />
  );
};

export default RegisterContainer;
