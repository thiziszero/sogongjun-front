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

interface SearchResult {
  nationality: string;
  grade: number;
  questionContent: string;
  image: string;
}

const FairPresentation = (props: FairPresentationProps) => (
  <Container maxW="container.xl" py={8}>
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Flex p={4} bg="gray.100" alignItems="center" mb={8}>
        <Heading size="md" onClick={props.onBack}>
          NFT Fair
        </Heading>
        <Spacer />
        <Button onClick={props.onBack}>질문으로 돌아가기</Button>
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

      <SearchComponent
        onSearchResults={(results: SearchResult[]) => console.log(results)}
      />

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

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {props.nfts.map((nft) => (
          <Box
            key={nft.tokenId}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => props.onNftClick(nft)}
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
    </Flex>
  </Container>
);

export default FairPresentation;
