export interface RegisterRequest {
    nickname: string;
    nationality: string;
    grade: number;
    password: string;
}

// 사용자 로그인 요청 및 응답
export interface LoginRequest {
    nickname: string;
    password: string;
}

// 질문 및 응답 생성 요청 및 응답
export interface QuestionRequest {
    content: string;
}

// 답변을 이미지로 변환 요청 및 응답
export interface AnswerToImageRequest {
    answerText: string;
}

// NFT 생성 요청 및 응답
export interface CreateNFTRequest {
    questionId: number;
    questionContent: string;
    answerContent: string;
    nationality: string;
    grade: number;
    imageUrl: string;
}