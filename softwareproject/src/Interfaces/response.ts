export interface RegisterResponse {
    message: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface QuestionResponse {
    questionId: number;
    answer: {
        text: string;
        image: string | null;
    };
}

export interface AnswerToImageResponse {
    questionId: number;
    image: string;
}

export interface CreateNFTResponse {
    message: string;
    nft: {
        tokenId: string;
        metadataUrl: string;
    };
}

// NFT 상세 정보 조회 응답
export interface NFTDetailResponse {
    questionId: number;
    content: string;
    nft: {
        tokenId: string;
        metadataUrl: string;
        image: string;
        nationality: string;
        grade: number;
        answerContent: string;
    };
}

// NFT 목록 조회 응답
export interface NFTListResponse {
    nfts: Array<{
        tokenId: string;
        metadataUrl: string;
        questionContent: string;
        answerContent: string;
        nationality: string;
        grade: string;
        imageUrl: string;
    }>;
}

// Popular NFT 목록 조회 응답
export interface PopularNFTResponse {
    data: NFTData[];
}

export interface NFTData {
    count: number;
    keyword: string;
    nftDetails: {
        answerContent: string;
        grade: number;
        image: string;
        nationality: string;
        questionContent: string;
    };
}