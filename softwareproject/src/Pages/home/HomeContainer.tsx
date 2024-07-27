import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import HomePresentation from "./HomePresentation";
import { userApi, questionApi, nftApi } from "../../Apis/apis";
import { QuestionRequest, AnswerToImageRequest, CreateNFTRequest } from "../../Interfaces/request";
import { Message } from "../../Interfaces/interface";

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();
  const context = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: 1, message: "안녕하세요!", sender: "bot" },
    { id: 2, message: "무엇을 도와드릴까요?", sender: "bot" },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        localStorage.setItem("id", id);
        localStorage.setItem("token", response.data.token);
        context.setIsLoggedIn(true);
        context.setUserId(id);
        context.setAccessToken(response.data.token);
        context.setGrade(response.data.grade);
        context.setNationality(response.data.nationality);
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

  const onClickFair = () => {
    navigate("/fair");
  };

  const onClickMypage = () => {
    navigate("/mypage");
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
    if (!context.isLoggedIn) {
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
        // Step 1: 질문 -> 답변 { questionid, answer }
        const questionRequest: QuestionRequest = { content: inputValue };
        const questionResponse = await questionApi.askQuestion(questionRequest);
        const { questionId, answer } = questionResponse.data;
  
        // 답변 메시지 추가
        setChatHistory((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            message: answer.text,
            sender: "bot",
          },
        ]);

        // 이미지 생성 중 메시지 추가
        setChatHistory((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            message: "이미지가 생성 중입니다.",
            sender: "bot",
            loadingImage: true,
          },
        ]);

        // Step 2: 답변 -> 이미지 { questionId, imageURL }
        const answerToImageRequest: AnswerToImageRequest = {
          questionId,
          answerText: answer.text,
        };
        const answerToImageResponse = await questionApi.convertAnswerToImage(answerToImageRequest);
  
        // 이미지 생성 완료 메시지로 업데이트
        setChatHistory((prev) => [
          ...prev.filter(msg => !msg.loadingImage),
          {
            id: prev.length + 1,
            message: "이미지가 생성되었습니다",
            image: answerToImageResponse.data.image,
            sender: "bot",
          },
        ]);
  
        // Step 3: Create NFT
        const createNFTRequest: CreateNFTRequest = {
          questionId,
          questionContent: inputValue,
          answerContent: answer.text,
          nationality: context.nationality,
          grade: context.grade,
          imageUrl: answerToImageResponse.data.image || "",
        };
        const nftResponse = await nftApi.createNFT(createNFTRequest);
  
        // If NFT is successfully created, display the tokenId
        if (nftResponse.data.nft) {
          setChatHistory((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              message: `NFT가 생성되었습니다. Token ID: ${nftResponse.data.nft.tokenId}`,
              sender: "bot",
            },
          ]);
        }
  
      } catch (error) {
        console.error("API 호출 오류:", error);
        setChatHistory((prev) => [
          ...prev.filter(msg => !msg.loadingImage),
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
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isLoginModalOpen) {
        onLogin();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isLoginModalOpen, id, password]);

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
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
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
      isLoggedIn={context.isLoggedIn}
      onLogout={onLogout}
      onClickMypage={onClickMypage}
    />
  );
};

export default HomeContainer;
