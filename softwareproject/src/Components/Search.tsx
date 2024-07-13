// src/Components/Search.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface SearchResult {
  nationality: string;
  grade: number;
  questionContent: string;
  image: string;
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get<SearchResult[]>('http://54.180.251.107:3000/api/search', {
        params: { query, nationality, grade }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching NFTs:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for NFTs"
      />

      <select value={nationality} onChange={e => setNationality(e.target.value)}>
        <option value="">Select Nationality</option>
        <option value="southkorea">South Korea</option>
        <option value="us">US</option>
        <option value="uk">UK</option>
      </select>

      <select value={grade} onChange={e => setGrade(e.target.value)}>
        <option value="">Select Grade</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
          <option key={grade} value={grade}>{grade}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results</h2>
        {results.map((item, index) => (
          <div key={index}>
            <p>Nationality: {item.nationality}</p>
            <p>Grade: {item.grade}</p>
            <p>Question: {item.questionContent}</p>
            <img src={item.image} alt="NFT" style={{ width: "100px", height: "100px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
