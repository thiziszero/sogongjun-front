import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Spacer,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FiUser, FiBook, FiFlag } from "react-icons/fi";
import { IoNavigate } from "react-icons/io5";
import { RiProfileLine, RiQuestionAnswerLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";

interface MypagePresentationProps {
  userId: string | null;
  userGrade: number | null;
  userNationality: string | null;
  onClickFair: () => void;
  onLogout: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onBack: () => void;
}

const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onClickFair: () => void;
  onLogout: () => void;
  onBack: () => void;
}> = ({ isOpen, onClose, onClickFair, onLogout, onBack }) => {
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
        <Button variant="ghost" onClick={onBack}>
          <HStack>
            <Icon as={RiQuestionAnswerLine} />
            <Text as="b">질문하기</Text>
          </HStack>
        </Button>
        <Button variant="ghost" onClick={onLogout}>
          <HStack>
            <Icon as={TbLogout} />
            <Text as="b">로그아웃</Text>
          </HStack>
        </Button>
        <Spacer />
        <Button onClick={onClose}>닫기</Button>
      </VStack>
    </Box>
  );
};

const MypagePresentation: React.FC<MypagePresentationProps> = (props) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar
        isOpen={props.isSidebarOpen}
        onClose={props.onToggleSidebar}
        onClickFair={props.onClickFair}
        onLogout={props.onLogout}
        onBack={props.onBack}
      />

      <Flex
        direction="column"
        transition="0.3s ease"
        ml={props.isSidebarOpen ? "220px" : "0"}
      >
        {/* Header */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg={cardBgColor}
          color="gray.800"
          shadow="md"
        >
          <Flex align="center">
            <Button onClick={props.onToggleSidebar} variant="outline" mr={3}>
            <GiHamburgerMenu />
            </Button>
            <Heading size="lg">마이페이지</Heading>
          </Flex>
          <HStack>
            <Button onClick={props.onBack}>
              <HStack>
                <Icon as={RiQuestionAnswerLine} />
                <Text as="b">질문</Text>
              </HStack>
            </Button>
            <Button colorScheme="red" onClick={props.onLogout}>
              <HStack>
                <Icon as={TbLogout} />
                <Text as="b">로그아웃</Text>
              </HStack>
            </Button>
          </HStack>
        </Flex>

        <Box maxWidth="800px" margin="auto" mt={8} p={4}>
          <Box
            bg={cardBgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            p={6}
            boxShadow="sm"
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="md">사용자 정보</Heading>
              <Text fontSize="sm" color="gray.500">
                개인 상세 정보
              </Text>
              <Divider />
              <VStack align="stretch" spacing={4} pt={2}>
                <HStack>
                  <Icon as={FiUser} color="gray.500" />
                  <Text fontWeight="medium" width="120px">
                    사용자 ID:
                  </Text>
                  <Text>{props.userId}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiBook} color="gray.500" />
                  <Text fontWeight="medium" width="120px">
                    사용자 학년:
                  </Text>
                  <Text>{props.userGrade}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiFlag} color="gray.500" />
                  <Text fontWeight="medium" width="120px">
                    사용자 국적:
                  </Text>
                  <Text>{props.userNationality}</Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MypagePresentation;
