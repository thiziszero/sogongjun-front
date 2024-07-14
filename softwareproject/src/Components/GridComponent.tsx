import React, { useState, useMemo } from "react";
import {
  Grid,
  Box,
  Image,
  Text,
  Select,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { NFTListResponse } from "../Interfaces/response";

interface FilteredNFTGridProps {
  nfts: NFTListResponse["nfts"];
  onNftClick: (nft: NFTListResponse["nfts"][0]) => void;
}

const FilteredNFTGrid: React.FC<FilteredNFTGridProps> = ({ nfts, onNftClick }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const grades = useMemo(() => {
    const gradeSet = new Set(nfts.map((nft) => nft.grade));
    return Array.from(gradeSet)
      .map(grade => parseInt(grade, 10))
      .filter(grade => !isNaN(grade))
      .sort((a, b) => a - b)
      .map(grade => grade.toString());
  }, [nfts]);

  const nationalities = useMemo(() => Array.from(new Set(nfts.map((nft) => nft.nationality))), [nfts]);

  const filteredNfts = useMemo(() => {
    return nfts.filter((nft) => {
      const gradeMatch = selectedGrade ? nft.grade === selectedGrade : true;
      const nationalityMatch = selectedNationality ? nft.nationality === selectedNationality : true;
      const searchMatch = searchQuery
        ? nft.questionContent.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return gradeMatch && nationalityMatch && searchMatch;
    });
  }, [nfts, selectedGrade, selectedNationality, searchQuery]);

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Select
          placeholder="학년을 선택하세요"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </Select>
        <Select
          placeholder="국적을 선택하세요"
          value={selectedNationality}
          onChange={(e) => setSelectedNationality(e.target.value)}
        >
          {nationalities.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </Select>
        <Input
          placeholder="검색 내용을 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </HStack>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredNfts.map((nft) => (
          <Box
            key={nft.tokenId}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => onNftClick(nft)}
            maxW="250px"
            maxH="500px"
          >
            <Image
              src={nft.imageUrl}
              alt={nft.questionContent}
              objectFit="cover"
              w="100%"
              h="300px"
            />
            <Box borderTopWidth="1px" borderTopColor="gray.200" mt={2} />
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
  );
};

export default FilteredNFTGrid;