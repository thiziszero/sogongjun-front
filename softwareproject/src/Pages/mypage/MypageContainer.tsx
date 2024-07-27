// MypageContainer.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import MypagePresentation from "./MypagePresentation";
import { nftApi } from "../../Apis/apis"; // Ensure this import path is correct
import { NFTListResponse } from "../../Interfaces/response";
import { useDisclosure } from "@chakra-ui/react";

const MypageContainer: React.FC = () => {
  const navigate = useNavigate();
  const context = useAppContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [nfts, setNfts] = useState<NFTListResponse["nfts"]>([]);
  const [selectedNft, setSelectedNft] = useState<NFTListResponse["nfts"][0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await nftApi.getNFTList();
        setNfts(response.data.nfts);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      }
    };
    fetchNFTs();
  }, []);

  const onLogout = () => {
    context.logout();
    navigate(-1);
  };

  const onClickFair = () => {
    navigate("/fair");
  };

  const onBack = () => {
    navigate(-1);
  };

  const handleNftClick = (nft: NFTListResponse["nfts"][0]) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
  };

  return (
    <MypagePresentation
      userId={context.userId}
      userGrade={context.grade}
      userNationality={context.nationality}
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      onClickFair={onClickFair}
      onLogout={onLogout}
      onBack={onBack}
      nfts={nfts}
      selectedNft={selectedNft}
      isModalOpen={isModalOpen}
      onNftClick={handleNftClick}
      onCloseModal={handleCloseModal}
    />
  );
};

export default MypageContainer;
