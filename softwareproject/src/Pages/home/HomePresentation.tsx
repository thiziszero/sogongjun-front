import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Spinner,
  VStack,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  Icon,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { IoNavigate } from "react-icons/io5";
import { RiProfileLine, RiQuestionAnswerLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
  image?: string;
  loadingImage?: boolean;
}

interface HomePresentationProps {
  onLogin: () => void;
  chatHistory: Message[];
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  messageEndRef: React.RefObject<HTMLDivElement>;
  isLoginModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
  id: string;
  setId: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  onCreate: () => void;
  onFindID: () => void;
  onFindPassword: () => void;
  onClickFair: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onClickMypage: () => void;
}

const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onClickFair: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginModalOpen: () => void;
  onClickMypage: () => void;
}> = ({
  isOpen,
  onClose,
  onClickFair,
  isLoggedIn,
  onLogout,
  onLoginModalOpen,
  onClickMypage,
}) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      width="220px"
      height="100%"
      bg="gray.100"
      boxShadow="2xl"
      zIndex={20}
      transition="0.3s"
    >
      <VStack align="stretch" p={4} spacing={4} height="100%">
        <Flex justifyContent="flex-end" alignItems="center">
          <HStack>
            <Heading size="md">Navigate</Heading>
            <Icon as={IoNavigate} />
          </HStack>
          <Spacer />
          <Button onClick={onClose} variant="ghost" size="sm">
            ✕
          </Button>
        </Flex>
        <Divider />
        <Button variant="ghost" onClick={onClickFair}>
          <HStack>
            <Icon as={RiProfileLine} />
            <Text as="b">전시회</Text>
          </HStack>
        </Button>
        <Divider />
        {isLoggedIn && (
          <Button variant="ghost" onClick={onClickMypage}>
            <HStack>
              <Icon as={CgProfile} />
              <Text as="b">마이페이지</Text>
            </HStack>
          </Button>
        )}
        <Divider />
        <Spacer />
        {isLoggedIn ? (
          <Button onClick={onLogout}>
            <HStack>
              <Icon as={TbLogout} />
              <Text as="b">로그아웃</Text>
            </HStack>
          </Button>
        ) : (
          <Button onClick={onLoginModalOpen}>
            <HStack>
              <Icon as={BiLogIn} />
              <Text as="b">로그인</Text>
            </HStack>
          </Button>
        )}
        <Button onClick={onClose}>닫기</Button>
      </VStack>
    </Box>
  );
};

const HomePresentation: React.FC<HomePresentationProps> = (props) => {
  const cardBgColor = useColorModeValue("gray.100", "gray.700");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onSendMessage();
    }
  };

  return (
    <Flex height="100vh">
      <Sidebar
        isOpen={props.isSidebarOpen}
        onClose={props.onToggleSidebar}
        onClickFair={props.onClickFair}
        isLoggedIn={props.isLoggedIn}
        onLogout={props.onLogout}
        onLoginModalOpen={props.onLoginModalOpen}
        onClickMypage={props.onClickMypage}
      />
      <Flex
        flex={1}
        direction="column"
        ml={props.isSidebarOpen ? "220px" : "0"}
        transition="margin-left 0.3s"
      >
        {/* Header */}
        <Flex
          p={4}
          as="header"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg={cardBgColor}
          color="gray.800"
          shadow="md"
        >
          <Button onClick={props.onToggleSidebar} mr={3} variant="outline">
          <GiHamburgerMenu />
          </Button>
          <Heading size="md">MultiLearn</Heading>
          <Spacer />
          <Button mr={3} variant="outline" onClick={props.onClickFair}>
            <HStack>
              <Icon as={RiProfileLine} />
              <Text as="b">전시회</Text>
            </HStack>
          </Button>
          {props.isLoggedIn ? (
            <Button ml="auto" colorScheme="red" onClick={props.onLogout}>
              <HStack>
                <Icon as={TbLogout} />
                <Text as="b">로그아웃</Text>
              </HStack>
            </Button>
          ) : (
            <Button ml="auto" onClick={props.onLoginModalOpen}>
              로그인
            </Button>
          )}
        </Flex>

        {/* Chat Area */}
        <VStack
          flex={1}
          overflowY="auto"
          p={4}
          spacing={4}
          alignItems="stretch"
        >
          {props.chatHistory.map((msg) => (
            <Flex
              key={msg.id}
              justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
            >
              <Box
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                bg={msg.sender === "user" ? "blue.100" : "gray.100"}
                borderRadius="md"
                p={2}
                maxWidth="80%"
              >
                <Text>{msg.message}</Text>
                {msg.loadingImage && (
                  <HStack>
                    <Spinner size="sm" />
                    <Text>이미지가 생성 중...</Text>
                  </HStack>
                )}
                {!msg.loadingImage && msg.image && (
                  <Image src={msg.image} alt="생성된 이미지" mt={2} />
                )}
              </Box>
            </Flex>
          ))}
          <div ref={props.messageEndRef}></div>
        </VStack>

        {/* Input Area */}
        <Flex p={4} bg="gray.100">
          <Input
            value={props.inputValue}
            onChange={props.onInputChange}
            placeholder="메시지를 입력하세요..."
            mr={2}
            onKeyPress={handleKeyPress}
          />
          <Button variant={"outline"} onClick={props.onSendMessage} ml={2}>
            <HStack>
              <Text as={"b"}>전송</Text>
              <RiQuestionAnswerLine />
            </HStack>
          </Button>
        </Flex>

        {/* Login Modal */}
        <Modal
          isOpen={props.isLoginModalOpen}
          onClose={props.onLoginModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>로그인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!props.error}>
                <FormLabel>아이디</FormLabel>
                <Input
                  value={props.id}
                  onChange={(e) => props.setId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                />
              </FormControl>
              <FormControl mt={4} isInvalid={!!props.error}>
                <FormLabel>비밀번호</FormLabel>
                <Input
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
                <FormErrorMessage>{props.error}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Center flexDirection="column" w="100%">
                <Button
                  colorScheme="blue"
                  w="100%"
                  mb={4}
                  onClick={props.onLogin}
                >
                  로그인
                </Button>
                <HStack spacing={4} justify="center">
                  <Button variant="ghost" onClick={props.onCreate}>
                    회원가입
                  </Button>
                  <Button variant="ghost" onClick={props.onFindID}>
                    아이디 찾기
                  </Button>
                  <Button variant="ghost" onClick={props.onFindPassword}>
                    비밀번호 찾기
                  </Button>
                </HStack>
              </Center>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default HomePresentation;
