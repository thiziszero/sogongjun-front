import React, { useState, useEffect } from "react";
import { nftApi } from "../../Apis/apis";
import FairPresentation from "./FairPresentation";
import { NFTListResponse } from "../../Interfaces/response";

const FairContainer: React.FC = () => {
  const [nfts, setNfts] = useState<NFTListResponse["nfts"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<
    NFTListResponse["nfts"][0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await nftApi.getNFTList();
      console.log(response);
      setNfts(response.data.nfts);
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

  return (
    <FairPresentation
      nfts={nfts}
      isLoading={isLoading}
      error={error}
      selectedNft={selectedNft}
      isModalOpen={isModalOpen}
      onNftClick={handleNftClick}
      onCloseModal={handleCloseModal}
    />
  );
};

export default FairContainer;
