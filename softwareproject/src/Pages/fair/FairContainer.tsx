import React, { useState, useEffect, useMemo } from "react";
import FairPresentation from "./FairPresentation";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import { nftApi, userApi } from "../../Apis/apis";
import { NFTListResponse, NFTData } from "../../Interfaces/response";

const FairContainer: React.FC = () => {
  const navigate = useNavigate();
  const context = useAppContext();
  const [nfts, setNfts] = useState<NFTListResponse["nfts"]>([]);
  const [popularNFTs, setPopularNFTs] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<NFTListResponse["nfts"][0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPopularNft, setSelectedPopularNft] = useState<NFTData | null>(null);
  const [searchResults, setSearchResults] = useState<NFTListResponse["nfts"]>([]); // Add state for search results
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNfts, setFilteredNfts] = useState<NFTListResponse["nfts"]>(nfts); // State for filtered NFTs

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const grades = useMemo(() => {
    const gradeSet = new Set(nfts.map((nft) => nft.grade));    
    return Array.from(gradeSet)
      .map(grade => parseInt(grade, 10))
      .filter(grade => !isNaN(grade))
      .sort((a, b) => a - b)
      .map(grade => grade.toString());
  }, [nfts]);

  const nationalities = useMemo(() => Array.from(new Set(nfts.map((nft) => nft.nationality))), [nfts]);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await nftApi.getNFTList();
      const popular_response = await nftApi.getNFTPopularList();
      //console.log("인기", popular_response);
      //console.log("일반", response);
      setFilteredNfts(response.data.nfts);
      setNfts(response.data.nfts);
      setPopularNFTs(Array.isArray(popular_response.data) ? popular_response.data : []);
      setIsLoading(false);
    } catch (err) {
      setError("NFT 목록을 불러오는 데 실패했습니다.");
      setIsLoading(false);
    }
  };

  const handleNftClick = (nft: NFTListResponse["nfts"][0]) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
  };

  const handlePopularNftClick = (nft: NFTData) => {
    setSelectedPopularNft(nft);
  };

  const handleClosePopularNftModal = () => {
    setSelectedPopularNft(null);
  };

  const handleSearch = async () => {
    if (!searchQuery && !selectedNationality && !selectedGrade) {
      setFilteredNfts(nfts);
      return;
    }

    try {
      const response = await nftApi.searchNFTs({
        query: searchQuery,
        nationality: selectedNationality,
        grade: selectedGrade,
      });
      console.log("API response:", response);
  
      const filteredResults = nfts.filter((nft) => {
        const gradeMatch = selectedGrade ? nft.grade === selectedGrade : true;
        const nationalityMatch = selectedNationality ? nft.nationality === selectedNationality : true;
        const queryMatch = searchQuery ? nft.questionContent.includes(searchQuery) || nft.answerContent.includes(searchQuery) : true;
        return gradeMatch && nationalityMatch && queryMatch;
      });
  
      setFilteredNfts(filteredResults);
    } catch (error) {
      console.error("Error searching NFTs:", error);
    }
  };
  

  const onBack = () => {
    navigate('/');
  }

  const onLogin = async () => {
    if (!id || !password) {
      setError("아이디/패스워드를 입력해주세요");
    } else {
      setError("");
      try {
        const response = await userApi.login({ nickname: id, password });
        localStorage.setItem("id", id);
        localStorage.setItem("token", response.data.token);
        context.setIsLoggedIn(true);
        context.setUserId(id);
        context.setAccessToken(response.data.token);
        onLoginModalClose();
        alert("로그인 성공");
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    context.logout();
  };

  const handleIdChange = (value: string) => {
    setId(value);
    if (loginError) {
      setLoginError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (loginError) {
      setLoginError("");
    }
  };

  return (
    <FairPresentation
      nfts={searchResults.length > 0 ? searchResults : nfts} // Display search results if available
      popularNFTs={popularNFTs}
      isLoading={isLoading}
      error={error}
      selectedNft={selectedNft}
      isModalOpen={isModalOpen}
      onNftClick={handleNftClick}
      onCloseModal={handleCloseModal}
      onBack={onBack}
      isLoggedIn={context.isLoggedIn}
      onLogin={onLogin}
      onLogout={onLogout}
      isLoginModalOpen={isLoginModalOpen}
      onLoginModalOpen={onLoginModalOpen}
      onLoginModalClose={onLoginModalClose}
      id={id}
      setId={handleIdChange}
      password={password}
      setPassword={handlePasswordChange}
      loginError={loginError}
      selectedPopularNft={selectedPopularNft}
      onPopularNftClick={handlePopularNftClick}
      onClosePopularNftModal={handleClosePopularNftModal}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSearch={handleSearch}
      grades={grades}
      nationalities={nationalities}
      selectedGrade={selectedGrade}
      setSelectedGrade={setSelectedGrade}
      selectedNationality={selectedNationality}
      setSelectedNationality={setSelectedNationality}
      filteredNfts={filteredNfts}
      setfilteredNfts={setFilteredNfts}
    />
  );
};

export default FairContainer;
