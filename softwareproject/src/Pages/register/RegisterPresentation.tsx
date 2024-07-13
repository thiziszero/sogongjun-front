import React from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Select,
} from "@chakra-ui/react";

interface RegisterPresentationProps {
  password: string;
  setPassword: (password: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  nationality: string;
  setNationality: (nationality: string) => void;
  grade: number | undefined;
  setGrade: (grade: number) => void;
  error: string;
  onRegister: () => void;
}

const RegisterPresentation: React.FC<RegisterPresentationProps> = (props) => {
  const nationalities = [
    "미국",
    "영국",
    "베트남",
    "대한민국",
    "일본",
    "중국",
    "러시아",
  ];

  return (
    <div>
      <Flex justify="center" align="center" minHeight="100vh">
        <Box alignContent={"center"}>
          <Stack spacing={2}>
            <Box textAlign={"center"}>
              <Heading>회원가입👌</Heading>
              <img
                src="https://news.nateimg.co.kr/orgImg/ck/2024/01/05/kuk202401050348.680x.0.jpg"
                width="300px"
                height="300px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                alt="회원가입 이미지"
              />
            </Box>
            <Box
              padding="10"
              borderWidth="1px"
              borderRadius="lg"
              minHeight="400px"
              minWidth="400px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Stack spacing={4}>
                {props.error && (
                  <Alert status="error">
                    <AlertIcon />
                    {props.error}
                  </Alert>
                )}
                <Input
                  placeholder="닉네임"
                  size="md"
                  value={props.nickname}
                  onChange={(e) => props.setNickname(e.target.value)}
                />
                <Input
                  placeholder="비밀번호"
                  size="md"
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
                <Select
                  placeholder="국적을 선택하세요"
                  value={props.nationality}
                  onChange={(e) => props.setNationality(e.target.value)}
                >
                  {nationalities.map((nation) => (
                    <option key={nation} value={nation}>
                      {nation}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="학년"
                  size="md"
                  type="number"
                  value={props.grade || ""}
                  onChange={(e) => props.setGrade(Number(e.target.value))}
                />
                <Button onClick={props.onRegister}>등록하기</Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default RegisterPresentation;
