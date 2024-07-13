import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
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
} from "@chakra-ui/react";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
}

interface HomePresentationProps {
  onLogin: () => void;
  chatHistory: Message[];
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
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
}

const HomePresentation: React.FC<HomePresentationProps> = ({
  onLogin,
  chatHistory,
  inputValue,
  onInputChange,
  onSendMessage,
  isOpen,
  onOpen,
  onClose,
  messageEndRef,
  isLoginModalOpen,
  onLoginModalOpen,
  onLoginModalClose,
  id,
  setId,
  password,
  setPassword,
  error,
  onCreate,
  onFindID,
  onFindPassword,
  onClickFair,
  isLoggedIn,
  onLogout,
}) => {
  return (
    <Flex height="100vh" direction="column">
      {/* Header */}
      <Flex p={4} bg="gray.100" alignItems="center">
        <Heading size="md">Logo</Heading>
        <Button ml={2} onClick={onOpen}>
          메뉴
        </Button>
        {isLoggedIn ? (
          <Button ml="auto" onClick={onLogout}>
            로그아웃
          </Button>
        ) : (
          <Button ml="auto" onClick={onLoginModalOpen}>
            로그인
          </Button>
        )}
      </Flex>

      {/* Chat Area */}
      <VStack flex={1} overflowY="auto" p={4} spacing={4} alignItems="stretch">
        {chatHistory.map((msg) => (
          <Flex
            key={msg.id}
            justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
          >
            <Box
              maxWidth="70%"
              bg={msg.sender === "user" ? "blue.100" : "gray.200"}
              p={2}
              borderRadius="md"
            >
              <Text>{msg.message}</Text>
            </Box>
          </Flex>
        ))}
        <div ref={messageEndRef}></div>
      </VStack>

      {/* Input Area */}
      <Flex p={4} bg="gray.100">
        <Input
          value={inputValue}
          onChange={onInputChange}
          placeholder="메시지를 입력하세요..."
          mr={2}
        />
        <Button onClick={onSendMessage}>전송</Button>
      </Flex>

      {/* Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">메뉴</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch">
              <Button variant="ghost" onClick={onClickFair}>
                전시회
              </Button>
              {isLoggedIn && <Button variant="ghost">마이페이지</Button>}
              {isLoggedIn ? (
                <Button variant="ghost" onClick={onLogout}>
                  로그아웃
                </Button>
              ) : (
                <Button variant="ghost" onClick={onLoginModalOpen}>
                  로그인
                </Button>
              )}
            </VStack>
          </DrawerBody>
          <Button onClick={onClose}>닫기</Button>
        </DrawerContent>
      </Drawer>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!error}>
              <FormLabel>아이디</FormLabel>
              <Input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
            </FormControl>
            <FormControl mt={4} isInvalid={!!error}>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Center flexDirection="column" w="100%">
              <Button colorScheme="blue" w="100%" mb={4} onClick={onLogin}>
                로그인
              </Button>
              <HStack spacing={4} justify="center">
                <Button variant="ghost" onClick={onCreate}>
                  회원가입
                </Button>
                <Button variant="ghost" onClick={onFindID}>
                  아이디 찾기
                </Button>
                <Button variant="ghost" onClick={onFindPassword}>
                  비밀번호 찾기
                </Button>
              </HStack>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HomePresentation;
