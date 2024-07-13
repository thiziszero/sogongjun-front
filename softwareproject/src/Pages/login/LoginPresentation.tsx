import {
  Box,
  Button,
  Input,
  Stack,
  Flex,
  Spacer,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

interface LoginPresentationProps {
  id: string;
  setId: (id: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  onLogin: () => void;
  onCreate: () => void;
  onFindID: () => void;
  onFindPassword: () => void;
}

const LoginPresentation: React.FC<LoginPresentationProps> = (props) => (
  <div>
    <Flex justify="center" align="center" minHeight="100vh">
    <Box alignContent={"center"}>
      <Stack spacing={2}>
        <Box textAlign={"center"}>
          <Heading>로고 들어올 자리🎉</Heading>
        </Box>
        <br />

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
              <Box>
                <img
                  src="https://news.nateimg.co.kr/orgImg/ck/2024/01/05/kuk202401050348.680x.0.jpg"
                  width="300px"
                  height="300px"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                ></img>
              </Box>
            {props.error && (
              <Alert status="error">
                <AlertIcon />
                {props.error}
              </Alert>
            )}
            <Input
              placeholder="ID"
              size="md"
              value={props.id}
              onChange={(e) => props.setId(e.target.value)}
            />
            <Input
              placeholder="Password"
              size="md"
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <Button onClick={props.onLogin}>로그인</Button>
            <Flex>
              <Box>
                <Button
                  onClick={props.onCreate}
                  variant="unstyled"
                  fontSize="12"
                >
                  회원 가입
                </Button>
              </Box>
              <Box>
                <Button variant="unstyled" fontSize="15">
                  |
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  onClick={props.onFindID}
                  variant="unstyled"
                  fontSize="12"
                >
                  아이디 찾기
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button variant="unstyled" fontSize="15">
                  |
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  onClick={props.onFindPassword}
                  variant="unstyled"
                  fontSize="12"
                >
                  비밀번호 찾기
                </Button>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
    </Flex>
  </div>
);

export default LoginPresentation;
