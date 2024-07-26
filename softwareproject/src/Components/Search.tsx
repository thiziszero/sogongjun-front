import React, { useState } from 'react';
import { Box, Input, Select, Button, Image, VStack, HStack, Text, Heading } from "@chakra-ui/react";

interface SearchResult {
  nationality: string;
  grade: number;
  questionContent: string;
  image: string;
}

interface SearchComponentProps {
  onSearchResults?: (results: SearchResult[]) => void;
}

const dummyData: SearchResult[] = [
  {
    nationality: "South Korea",
    grade: 11,
    questionContent: "ming3",
    image: "https://i.seadn.io/s/raw/files/c1abbfabee42bc2a146a79b807accb86.webp?w=500&auto=format",
  },
  {
    nationality: "South Korea",
    grade: 8,
    questionContent: "React hard",
    image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi2.tcafe2a.com%2F240505%2F2552fcd4d34bc4f05bce31c782f87e14_1714912750_8708.gif&type=sc960_832_gif",
  },
  {
    nationality: "South Korea",
    grade: 1,
    questionContent: "Help",
    image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FgeGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp&type=sc960_832",
  },
];

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    const filteredResults = dummyData.filter(
      item =>
        (!query || item.questionContent.toLowerCase().includes(query.toLowerCase())) &&
        (!nationality || item.nationality.toLowerCase() === nationality.toLowerCase()) &&
        (!grade || item.grade.toString() === grade)
    );
    setResults(filteredResults);
    if (onSearchResults) {
      onSearchResults(filteredResults);
    }
  };

  return (
    <Box p={4}>
      <HStack spacing={4} mb={4}>
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for NFTs"
        />
        <Select
          value={nationality}
          onChange={e => setNationality(e.target.value)}
          placeholder="Select Nationality"
        >
          <option value="southkorea">South Korea</option>
          <option value="us">US</option>
          <option value="uk">UK</option>
        </Select>
        <Select
          value={grade}
          onChange={e => setGrade(e.target.value)}
          placeholder="Select Grade"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </Select>
        <Button onClick={handleSearch} colorScheme="blue">검색</Button>
      </HStack>
      <VStack spacing={4}>
        {results.map((result, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
            <HStack spacing={4}>
              <Image src={result.image} alt={result.questionContent} boxSize="100px" />
              <VStack align="start">
                <Text>Nationality: {result.nationality}</Text>
                <Text>Grade: {result.grade}</Text>
                <Text>Question: {result.questionContent}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SearchComponent;
