import React, { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>(""); // Add state for search query
  const [searchResults, setSearchResults] = useState<NFTListResponse["nfts"]>([]); // Add state for search results

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await nftApi.getNFTList();
      const popular_response = await nftApi.getNFTPopularList();
      console.log("Popular NFTs:", popular_response.data);
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
    try {
      const response = await nftApi.searchNFTs({ query: searchQuery });
      setSearchResults(response.data.nfts);
    } catch (err) {
      setError("검색 결과를 불러오는 데 실패했습니다.");
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
      searchQuery={searchQuery} // Pass searchQuery to Presentation component
      setSearchQuery={setSearchQuery} // Pass setSearchQuery to Presentation component
      onSearch={handleSearch} // Pass handleSearch to Presentation component
    />
  );
};

export default FairContainer;
