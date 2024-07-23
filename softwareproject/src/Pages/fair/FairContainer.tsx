import React, { useState, useEffect } from "react";
import FairPresentation from "./FairPresentation";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import { nftApi, userApi } from "../../Apis/apis";
import { NFTListResponse, NFTData } from "../../Interfaces/response";

const FairContainer: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const [nfts, setNfts] = useState<NFTListResponse["nfts"]>([]);
  const [popularNFTs, setPopularNFTs] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<NFTListResponse["nfts"][0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPopularNft, setSelectedPopularNft] = useState<NFTData | null>(null);

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

  const onBack = () => {
    navigate('/');
  }

  const onLogin = async () => {
    if (!id || !password) {
      setLoginError("아이디/패스워드를 입력해주세요");
    } else {
      setLoginError("");
      try {
        const response = await userApi.login({ nickname: id, password });
        setIsLoggedIn(true);
        onLoginModalClose();
      } catch (error) {
        console.error("API 호출 오류:", error);
        setLoginError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    // 추가 로그아웃 로직 구현 (예: 토큰 제거)
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
      nfts={nfts}
      popularNFTs={popularNFTs}
      isLoading={isLoading}
      error={error}
      selectedNft={selectedNft}
      isModalOpen={isModalOpen}
      onNftClick={handleNftClick}
      onCloseModal={handleCloseModal}
      onBack={onBack}
      isLoggedIn={isLoggedIn}
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
    />
  );
};

export default FairContainer;
