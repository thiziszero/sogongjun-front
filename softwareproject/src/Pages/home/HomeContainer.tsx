import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import HomePresentation from "./HomePresentation";
import { userApi, questionApi, nftApi } from "../../Apis/apis";
import {QuestionRequest} from "../../Interfaces/request";
import { Message } from "../../Interfaces/interface";

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();
  const context = useAppContext();
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
        const response = await userApi.login({ nickname: id, password});
        console.log(response);
        context.setIsLoggedIn(true);
        context.setUserId(id);
        localStorage.setItem('token', response.data.token as string);
        console.log("메세지" + response.data.message);
        console.log("안녕" + localStorage.getItem('token'));
        onLoginModalClose();
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("아이디와 패스워드를 다시 확인해주세요");
      }
    }
  };

  const onLogout = () => {
    context.setIsLoggedIn(false);
    context.setUserId(null);
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
        const request: QuestionRequest = { content: inputValue };
        const response = await questionApi.askQuestion(request);
        const { data } = response;
        console.log(data);
        
        const newMessages: Message[] = [
          { id: chatHistory.length + 2, message: data.answer.text, sender: "bot" },
        ];

        if (data.answer.image) {
          newMessages.push({
            id: chatHistory.length + 3,
            message: "이미지가 생성되었습니다",
            image: data.answer.image, // null 대신 string | undefined를 사용
            sender: "bot",
          });
        }

        const nftResponse = await nftApi.createNFT({
          questionId: data.questionId,
          questionContent: inputValue,
          answerContent: data.answer.text,
          nationality: "KR", // 예시 데이터
          grade: 1, // 예시 데이터
          imageUrl: data.answer.image || "",
        });
        
        if (nftResponse.data.nft) {
          newMessages.push({
            id: chatHistory.length + 4,
            message: `NFT가 생성되었습니다. Token ID: ${nftResponse.data.nft.tokenId}`,
            sender: "bot",
          });
        }

        setChatHistory((prev) => [...prev, ...newMessages]);
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
      isLoggedIn={context.isLoggedIn}
      onLogout={onLogout}
    />
  );
};

export default HomeContainer;
