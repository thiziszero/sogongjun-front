import React from "react";
import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  VStack,
  Heading,
  Container,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";
import { NFTListResponse, NFTData } from "../../Interfaces/response";
import LoadingPresentation from "../../Components/Loading";
import KeywordChart from "../../Components/KeywordChart";
import FilteredNFTGrid from "../../Components/GridComponent";

interface FairPresentationProps {
  nfts: NFTListResponse["nfts"];
  popularNFTs: NFTData[];
  isLoading: boolean;
  error: string | null;
  selectedNft: NFTListResponse["nfts"][0] | null;
  isModalOpen: boolean;
  onNftClick: (nft: NFTListResponse["nfts"][0]) => void;
  onCloseModal: () => void;
  isLoggedIn: boolean;
  onBack: () => void;
  onLogin: () => void;
  onLogout: () => void;
  isLoginModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
  id: string;
  setId: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loginError: string;
  selectedPopularNft: NFTData | null;
  onPopularNftClick: (nft: NFTData) => void;
  onClosePopularNftModal: () => void;
}

const FairPresentation = (props: FairPresentationProps) => (
  <Container maxW="container.xl" py={8}>
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Flex
        p={4}
        bg="gray.100"
        alignItems="center"
        mb={8}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1}
        boxShadow="md"
      >
        <Heading size="md" onClick={props.onBack}>
          MultiLearn 전시회
        </Heading>
        <Spacer />
        <Button onClick={props.onBack}>질문하기</Button>
        {props.isLoggedIn ? (
          <Button ml="auto" onClick={props.onLogout}>
            로그아웃
          </Button>
        ) : (
          <Button ml="auto" onClick={props.onLoginModalOpen}>
            로그인
          </Button>
        )}
      </Flex>

      {/* Add padding to account for the fixed header */}
      <Box mt="80px">
        {/* Login Modal */}
        <Modal isOpen={props.isLoginModalOpen} onClose={props.onLoginModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>로그인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!props.loginError}>
                <FormLabel>아이디</FormLabel>
                <Input
                  value={props.id}
                  onChange={(e) => props.setId(e.target.value)}
                />
                <FormLabel mt={4}>비밀번호</FormLabel>
                <Input
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
                <FormErrorMessage>{props.loginError}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={props.onLogin}>
                로그인
              </Button>
              <Button variant="ghost" onClick={props.onLoginModalClose}>
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Main Content */}
        <Flex direction={{ base: "column", md: "row" }} justify="space-between">
          <Box flex={1} p={4} borderWidth={2}>
            {props.popularNFTs && props.popularNFTs.length > 0 ? (
              <KeywordChart data={props.popularNFTs} />
            ) : (
              <Text>인기 NFT 데이터가 없습니다.</Text>
            )}
            <Box textAlign={"center"}>
              <br></br>
              <Heading size="md" mb={4}>
                ❤️트랜드 키워드
              </Heading>
            </Box>
          </Box>
          <Box flex={1} p={4} borderWidth={2}>
            <Heading size="md" mb={4}>
              인기 NFT🔥
            </Heading>
            <Box display="flex" overflowX="scroll" p={2}>
              {props.popularNFTs.map((nft) => (
                <Box
                  key={nft.keyword}
                  borderWidth={1}
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  mr={4}
                  minW="250px"
                  onClick={() => props.onPopularNftClick(nft)}
                  maxW="500px"
                >
                  <Image
                    src={nft.nftDetails.image}
                    alt={nft.keyword}
                    objectFit="cover"
                    w="100%"
                    h="300px"
                  />
                  <Box borderTopWidth="1px" borderTopColor="gray.200" mt={2} />
                  <VStack p={4} align="start">
                    <Text fontWeight="bold" noOfLines={2} textAlign="left">
                      {nft.keyword}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      학년: {nft.nftDetails.grade}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      국적: {nft.nftDetails.nationality}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Keyword: {nft.keyword}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>

        {props.isLoading && (
          <Flex alignItems="center" justifyContent="center" flex={1}>
            <LoadingPresentation />
          </Flex>
        )}

        {props.error && (
          <Alert status="error">
            <AlertIcon />
            {props.error}
          </Alert>
        )}

        <Divider my={8} borderColor="gray.300" borderWidth={1} w="100" />

        <Box mt={8}>
          <Heading size="md" mb={4}>
            전체 NFT 목록
          </Heading>
          <FilteredNFTGrid nfts={props.nfts} onNftClick={props.onNftClick} />
        </Box>

        {/* NFT Detail Modal */}
        <Modal isOpen={props.isModalOpen} onClose={props.onCloseModal} size="xl">
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

        {/* Popular NFT Detail Modal */}
        <Modal
          isOpen={!!props.selectedPopularNft}
          onClose={props.onClosePopularNftModal}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>인기 NFT 상세 정보</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.selectedPopularNft && (
                <Flex>
                  <Box flex={1}>
                    <Image
                      src={props.selectedPopularNft.nftDetails.image}
                      alt={props.selectedPopularNft.keyword}
                    />
                  </Box>
                  <Box flex={1} ml={4}>
                    <VStack align="start" spacing={3}>
                      <Text fontWeight="bold">Keyword:</Text>
                      <Text>{props.selectedPopularNft.keyword}</Text>
                      <Text fontWeight="bold">질문 내용:</Text>
                      <Text>
                        {props.selectedPopularNft.nftDetails.questionContent}
                      </Text>
                      <Text fontWeight="bold">답변 내용:</Text>
                      <Text>
                        {props.selectedPopularNft.nftDetails.answerContent}
                      </Text>
                      <Text fontWeight="bold">
                        학년: {props.selectedPopularNft.nftDetails.grade}
                      </Text>
                      <Text fontWeight="bold">
                        국적: {props.selectedPopularNft.nftDetails.nationality}
                      </Text>
                      <Text fontWeight="bold">
                        Count: {props.selectedPopularNft.count}
                      </Text>
                    </VStack>
                  </Box>
                </Flex>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={props.onClosePopularNftModal}
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  </Container>
);

export default FairPresentation;
