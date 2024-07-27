// MypagePresentation.tsx
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
  Divider,
  Grid,
  Image,
} from "@chakra-ui/react";
import { FiUser, FiBook, FiFlag } from "react-icons/fi";
import { IoNavigate } from "react-icons/io5";
import { RiProfileLine, RiQuestionAnswerLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { NFTListResponse } from "../../Interfaces/response";

interface MypagePresentationProps {
  userId: string | null;
  userGrade: number | null;
  userNationality: string | null;
  onClickFair: () => void;
  onLogout: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onBack: () => void;
  nfts: any[];
  selectedNft: NFTListResponse["nfts"][0] | null;
  isModalOpen: boolean;
  onNftClick: (nft: NFTListResponse["nfts"][0]) => void;
  onCloseModal: () => void;
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
        <Divider />
        <Button variant="ghost" onClick={onBack}>
          <HStack>
            <Icon as={RiQuestionAnswerLine} />
            <Text as="b">질문하기</Text>
          </HStack>
        </Button>
        <Divider />
        <Spacer />
        <Button variant="ghost" onClick={onLogout}>
          <HStack>
            <Icon as={TbLogout} />
            <Text as="b">로그아웃</Text>
          </HStack>
        </Button>
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

        {/* NFT Listing Section */}
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
              <Heading size="md">내 NFT 목록 (예정)</Heading>
              <Grid
                templateColumns="repeat(4, 1fr)"
                gap={6}
              >
                {props.nfts.map((nft) => (
                  <Box
                    key={nft.tokenId}
                    borderWidth={1}
                    borderRadius="lg"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => props.onNftClick(nft)}
                  >
                    <Image
                      src={nft.imageUrl}
                      alt={nft.questionContent}
                      objectFit="cover"
                      w="100%"
                      h="200px"
                    />
                    <Box p={4}>
                      <Text fontWeight="bold" noOfLines={2} textAlign="left">
                        {nft.questionContent}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        학년: {nft.grade}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        국적: {nft.nationality}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Token ID: {nft.tokenId}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </VStack>
          </Box>
        </Box>

        {/* NFT Detail Modal */}
        <Modal
          isOpen={props.isModalOpen}
          onClose={props.onCloseModal}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>NFT 상세 정보</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.selectedNft && (
                <Flex>
                  <Box flex={1}>
                    <Image
                      src={props.selectedNft.imageUrl}
                      alt={props.selectedNft.questionContent}
                    />
                  </Box>
                  <Box flex={1} ml={4}>
                    <VStack align="start" spacing={3}>
                      <Text fontWeight="bold">질문 내용:</Text>
                      <Text>{props.selectedNft.questionContent}</Text>
                      <Text fontWeight="bold">답변 내용:</Text>
                      <Text>{props.selectedNft.answerContent}</Text>
                      <Text fontWeight="bold">
                        학년: {props.selectedNft.grade}
                      </Text>
                      <Text fontWeight="bold">
                        국적: {props.selectedNft.nationality}
                      </Text>
                      <Text fontWeight="bold">
                        Token ID: {props.selectedNft.tokenId}
                      </Text>
                    </VStack>
                  </Box>
                </Flex>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={props.onCloseModal}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default MypagePresentation;
