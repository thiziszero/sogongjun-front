import React from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  VStack,
  Heading,
  Container,
  Spinner,
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
} from "@chakra-ui/react";
import { NFTListResponse } from "../../Interfaces/response";
import LoadingPresentation from "../../Components/Loading";

interface FairPresentationProps {
  nfts: NFTListResponse["nfts"];
  isLoading: boolean;
  error: string | null;
  selectedNft: NFTListResponse["nfts"][0] | null;
  isModalOpen: boolean;
  onNftClick: (nft: NFTListResponse["nfts"][0]) => void;
  onCloseModal: () => void;
}

const FairPresentation: React.FC<FairPresentationProps> = ({
  nfts,
  isLoading,
  error,
  selectedNft,
  isModalOpen,
  onNftClick,
  onCloseModal,
}) => (
  <Container maxW="container.xl" py={8}>
    <Heading as="h1" size="xl" textAlign="center" mb={8}>
      NFT 전시회
    </Heading>

    {isLoading && (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box>
          <LoadingPresentation />
        </Box>
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
                  <Text fontWeight="bold">국적: {selectedNft.nationality}</Text>
                  <Text fontWeight="bold">Token ID: {selectedNft.tokenId}</Text>
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
  </Container>
);

export default FairPresentation;
