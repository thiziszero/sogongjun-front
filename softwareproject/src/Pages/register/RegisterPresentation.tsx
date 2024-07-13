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
    "United States of America(USA)",
    "United Kingdom(UK)",
    "Vietnam",
    "South Korea",
    "Japan",
    "China",
    "Russia",
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
                <Select
                  placeholder="학년"
                  size="md"
                  onChange={(e) => props.setGrade(Number(e.target.value))}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </Select>
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
