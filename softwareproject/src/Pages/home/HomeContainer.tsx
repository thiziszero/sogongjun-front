import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import HomePresentation from "./HomePresentation";
import { nftApi, questionApi, userApi } from "../../Apis/apis";
import {
  QuestionRequest,
  CreateNFTRequest,
} from "../../Interfaces/request";
import {
  QuestionResponse,
  CreateNFTResponse,
  NFTListResponse
} from "../../Interfaces/response";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
}

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const [nfts, setNfts] = useState<NFTListResponse["nfts"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: 1, message: "안녕하세요!", sender: "bot" },
    { id: 2, message: "무엇을 도와드릴까요?", sender: "bot" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const onLogin = async () => {
    if (!id || !password) {
      setError("아이디/패스워드를 입력해주세요");
    } else {
      setError("");
      try {
        const response = await userApi.login({ nickname: id, password });
        console.log("API 응답 데이터:", response.data);
        setIsLoggedIn(true);
        onLoginModalClose();
        // 로그인 성공 후 추가적인 처리 (예: 상태 업데이트, 리다이렉트 등)
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    // 여기에 로그아웃 관련 추가 로직을 구현할 수 있습니다.
    // 예: 토큰 제거, 서버에 로그아웃 요청 등
  };

  const onClickFair = () => {
    navigate("/fair");
  };

  const onCreate = () => {
    navigate("/register");
  };

  const onFindID = () => {
    navigate("/");
  };

  const onFindPassword = () => {
    navigate("/");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleIdChange = (value: string) => {
    setId(value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) {
      setError("");
    }
  };

  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      onLoginModalOpen();
      return;
    }

    if (inputValue.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { id: prev.length + 1, message: inputValue, sender: "user" },
      ]);
      setInputValue("");

      try {
        // Call /api/questions
        const questionRequest: QuestionRequest = {
          userId: 1, // 임시 userId, 실제로는 로그인된 사용자의 ID를 사용해야 합니다.
          content: inputValue,
        };
        const questionResponse = await questionApi.askQuestion(questionRequest);
        const questionData: QuestionResponse = questionResponse.data;

        // Call /api/nfts/{questionId}
        const createNFTRequest: CreateNFTRequest = {
          questionId: questionData.questionId,
          questionContent: inputValue,
          answerContent: questionData.answer.text,
          nationality: "KR", // 임시 값, 실제로는 사용자의 국적을 사용해야 합니다.
          grade: 1, // 임시 값, 실제로는 사용자의 등급을 사용해야 합니다.
          imageUrl: questionData.answer.image || "",
        };
        const nftResponse = await nftApi.createNFT(createNFTRequest);
        const nftData: CreateNFTResponse = nftResponse.data;

        // Add bot response to chat history
        setChatHistory((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            message: questionData.answer.text,
            sender: "bot",
          },
        ]);

        if (questionData.answer.image) {
          setChatHistory((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              message: `이미지가 생성되었습니다: ${questionData.answer.image}`,
              sender: "bot",
            },
          ]);
        }

        setChatHistory((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            message: `NFT가 생성되었습니다. Token ID: ${nftData.nft.tokenId}`,
            sender: "bot",
          },
        ]);
      } catch (error) {
        console.error("API 호출 오류:", error);
        setChatHistory((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            message: "죄송합니다. 오류가 발생했습니다.",
            sender: "bot",
          },
        ]);
      }
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  return (
    <HomePresentation
      onLogin={onLogin}
      chatHistory={chatHistory}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSendMessage={handleSendMessage}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      messageEndRef={messageEndRef}
      isLoginModalOpen={isLoginModalOpen}
      onLoginModalOpen={onLoginModalOpen}
      onLoginModalClose={onLoginModalClose}
      id={id}
      setId={handleIdChange}
      password={password}
      setPassword={handlePasswordChange}
      error={error}
      onClickFair={onClickFair}
      onCreate={onCreate}
      onFindID={onFindID}
      onFindPassword={onFindPassword}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
    />
  );
};

export default HomeContainer;
