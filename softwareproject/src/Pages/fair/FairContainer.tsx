import React, { useState, useEffect } from "react";
import FairPresentation from "./FairPresentation";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import { nftApi, userApi } from "../../Apis/apis";
import {
  NFTListResponse,
  NFTData,
} from "../../Interfaces/response";

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
    /*const response = await nftApi.getNFTList();
      const popular_response = await nftApi.getNFTPopularList();
      console.log("Popular NFTs:", popular_response.data);
      setNfts(response.data.nfts);
      // 수정된 부분: popular_response.data가 배열인 경우를 처리
      setPopularNFTs(Array.isArray(popular_response.data) ? popular_response.data : []);*/
    try {
      // Fetch the data from your API or use dummy data
      const dummyData = {
        nfts: [
          {
            tokenId: "1",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "What is the meaning of the life?",
            answerContent: "ting",
            nationality: "USA",
            grade: "11",
            imageUrl: "https://i.seadn.io/s/raw/files/c1abbfabee42bc2a146a79b807accb86.webp?w=500&auto=format",
          },
          {
            tokenId: "2",
            metadataUrl: "ipfs://QmeMfGGHgY2ANg4UXm9gcuGRShiHiFDsGVUx5Hg9BtJN1X",
            questionContent: "React hard",
            answerContent: "츄가 미래다.",
            nationality: "South Korea",
            grade: "8",
            imageUrl: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi2.tcafe2a.com%2F240505%2F2552fcd4d34bc4f05bce31c782f87e14_1714912750_8708.gif&type=sc960_832_gif",
          },
          {
            tokenId: "3",
            metadataUrl: "ipfs://QmeMfGGHgY2ANg4UXm9gcuGRShiHiFDsGVUx5Hg9BtJN1X",
            questionContent: "Soongsil University",
            answerContent: "ting",
            nationality: "UK",
            grade: "1",
            imageUrl: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FgeGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp&type=sc960_832",
          },
          {
            tokenId: "4",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "주식을 어떻게 해야해?",
            answerContent: "Park",
            nationality: "Japan",
            grade: "2",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3mM9IOFrMKFzuaUGzqq1okF4oBNxrO_ySw&s",
          },
          {
            tokenId: "5",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "소공전 파이팅",
            answerContent: "Meong",
            nationality: "China",
            grade: "7",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnUwVCoQsneKmJDUOdlp76vvE4oEZSRf7_Yw&s",
          },
          {
            tokenId: "6",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "When can I go home?",
            answerContent: "NAGA",
            nationality: "South Korea",
            grade: "9",
            imageUrl: "https://www.kocca.kr/trend/vol14/img/s132/img_01.png",
          },
          {
            tokenId: "7",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "I wanna go",
            answerContent: "Software",
            nationality: "USA",
            grade: "1",
            imageUrl: "https://flexible.img.hani.co.kr/flexible/normal/850/567/imgdb/original/2023/0111/20230111503366.jpg",
          },
          {
            tokenId: "8",
            metadataUrl: "ipfs://QmbGqrc3Fg8dKkSbrvDV3ahqyxzbDjbr3gmBDn8gDSm63N",
            questionContent: "MUYAHO",
            answerContent: "MUYAHO",
            nationality: "South Korea",
            grade: "4",
            imageUrl: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg",
          },
        ],
      };

      const dummyData_pop: NFTData[] = [
        {
          keyword: "jaebin",
          count: 7,
          nftDetails: {
            nationality: "southkorea",
            grade: 12,
            questionContent: "hello im jaebin thanks to study hard",
            answerContent: "can you filter my answer keyword?",
            image: "https://i.seadn.io/s/raw/files/c1abbfabee42bc2a146a79b807accb86.webp?w=500&auto=format",
          },
        },
        {
          keyword: "hello",
          count: 5,
          nftDetails: {
            nationality: "southkorea",
            grade: 12,
            questionContent: "hello im jaebin thanks to study hard",
            answerContent: "can you filter my answer keyword?",
            image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi2.tcafe2a.com%2F240505%2F2552fcd4d34bc4f05bce31c782f87e14_1714912750_8708.gif&type=sc960_832_gif",
          },
        },
        {
          keyword: "im",
          count: 4,
          nftDetails: {
            nationality: "southkorea",
            grade: 12,
            questionContent: "hello im jaebin thanks to study hard",
            answerContent: "can you filter my answer keyword?",
            image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FgeGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp&type=sc960_832",
          },
        },
      ];

      setNfts(dummyData.nfts);
      setPopularNFTs(dummyData_pop);
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
