import React from "react";
import {
  Box,
  Grid,
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
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { NFTListResponse, NFTData } from "../../Interfaces/response";
import LoadingPresentation from "../../Components/Loading";
import SearchComponent from "../../Components/Search";
import KeywordChart from "../../Components/KeywordChart";

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

const FairPresentation: React.FC<FairPresentationProps> = ({
  nfts,
  popularNFTs,
  isLoading,
  error,
  selectedNft,
  isModalOpen,
  onNftClick,
  onCloseModal,
  isLoggedIn,
  onBack,
  onLogin,
  onLogout,
  isLoginModalOpen,
  onLoginModalOpen,
  onLoginModalClose,
  id,
  setId,
  password,
  setPassword,
  loginError,
  selectedPopularNft,
  onPopularNftClick,
  onClosePopularNftModal,
}) => (
  <Container maxW="container.xl" py={8}>
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Flex p={4} bg="gray.100" alignItems="center" mb={8}>
        <Heading size="md" onClick={onBack}>NFT Fair</Heading>
        <Spacer />
        <Button onClick={onBack}>질문으로 돌아가기</Button>
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

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!loginError}>
              <FormLabel>아이디</FormLabel>
              <Input value={id} onChange={(e) => setId(e.target.value)} />
              <FormLabel mt={4}>비밀번호</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{loginError}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onLogin}>
              로그인
            </Button>
            <Button variant="ghost" onClick={onLoginModalClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Main Content */}
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box flex={1} p={4} borderWidth={2}>
          {popularNFTs && popularNFTs.length > 0 ? (
            <KeywordChart data={popularNFTs} />
          ) : (
            <Text>인기 NFT 데이터가 없습니다.</Text>
          )}
        </Box>
        <Box flex={1} p={4} borderWidth={2}>
          <Heading size="md" mb={4}>
            인기 NFT🔥
          </Heading>
          <Box display="flex" overflowX="scroll" p={2}>
            {popularNFTs.map((nft) => (
              <Box
                key={nft.keyword}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                mr={4}
                minW="250px"
                onClick={() => onPopularNftClick(nft)}
              >
                <Image src={nft.nftDetails.image} alt={nft.keyword} />
                <VStack p={4} align="start">
                  <Text fontWeight="bold" noOfLines={2}>
                    {nft.keyword}
                  </Text>
                  <Text>학년: {nft.nftDetails.grade}</Text>
                  <Text>국적: {nft.nftDetails.nationality}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Keyword: {nft.keyword}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <SearchComponent />

      {isLoading && (
        <Flex alignItems="center" justifyContent="center" flex={1}>
          <LoadingPresentation />
        </Flex>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {nfts.map((nft) => (
          <Box
            key={nft.tokenId}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => onNftClick(nft)}
          >
            <Image src={nft.imageUrl} alt={nft.questionContent} />
            <VStack p={4} align="start">
              <Text fontWeight="bold" noOfLines={2}>
                {nft.questionContent}
              </Text>
              <Text>학년: {nft.grade}</Text>
              <Text>국적: {nft.nationality}</Text>
              <Text fontSize="sm" color="gray.500">
                Token ID: {nft.tokenId}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* NFT Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>NFT 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedNft && (
              <Flex>
                <Box flex={1}>
                  <Image
                    src={selectedNft.imageUrl}
                    alt={selectedNft.questionContent}
                  />
                </Box>
                <Box flex={1} ml={4}>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="bold">질문 내용:</Text>
                    <Text>{selectedNft.questionContent}</Text>
                    <Text fontWeight="bold">답변 내용:</Text>
                    <Text>{selectedNft.answerContent}</Text>
                    <Text fontWeight="bold">학년: {selectedNft.grade}</Text>
                    <Text fontWeight="bold">
                      국적: {selectedNft.nationality}
                    </Text>
                    <Text fontWeight="bold">
                      Token ID: {selectedNft.tokenId}
                    </Text>
                  </VStack>
                </Box>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Popular NFT Detail Modal */}
      <Modal
        isOpen={!!selectedPopularNft}
        onClose={onClosePopularNftModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>인기 NFT 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPopularNft && (
              <Flex>
                <Box flex={1}>
                  <Image
                    src={selectedPopularNft.nftDetails.image}
                    alt={selectedPopularNft.keyword}
                  />
                </Box>
                <Box flex={1} ml={4}>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="bold">Keyword:</Text>
                    <Text>{selectedPopularNft.keyword}</Text>
                    <Text fontWeight="bold">질문 내용:</Text>
                    <Text>{selectedPopularNft.nftDetails.questionContent}</Text>
                    <Text fontWeight="bold">답변 내용:</Text>
                    <Text>{selectedPopularNft.nftDetails.answerContent}</Text>
                    <Text fontWeight="bold">
                      학년: {selectedPopularNft.nftDetails.grade}
                    </Text>
                    <Text fontWeight="bold">
                      국적: {selectedPopularNft.nftDetails.nationality}
                    </Text>
                    <Text fontWeight="bold">
                      Count: {selectedPopularNft.count}
                    </Text>
                  </VStack>
                </Box>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClosePopularNftModal}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  </Container>
);

export default FairPresentation;
