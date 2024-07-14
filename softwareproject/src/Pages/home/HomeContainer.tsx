import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure, Spinner } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import HomePresentation from "./HomePresentation";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
  image?: string;
  loadingImage?: boolean;
}

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
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
        // Dummy login response
        const response = { data: { success: true } };
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
        // Dummy response for chat
        const dummyResponse = {
          answer: {
            text: "인생에 대한 정의는 사람마다 다를 수 있지만, 일반적으로 말하면 인생은 각자의 경험과 선택, 그리고 그로 인해 얻는 성장과 의미들을 포괄하는 개념입니다. 인생은 단순히 존재하는 것 이상으로, 경험을 통해 배우고 발전하며 자아를 깊이 있게 이해하는 과정입니다. 때로는 성공과 실패, 기쁨과 슬픔, 도전과 극복의 연속이기도 합니다. 결국 인생은 각자가 자신의 가치관과 목표에 따라 의미를 부여하고 이루어 나가는 과정이라고 할 수 있습니다.",
            image: "https://newsimg-hams.hankookilbo.com/2022/03/23/579c2b14-56a7-4f46-b17d-1111e9a8a596.png",
          },
        };

        // Add bot text response to chat history
        const textMessageId = chatHistory.length + 2;
        setChatHistory((prev) => [
          ...prev,
          {
            id: textMessageId,
            message: dummyResponse.answer.text,
            sender: "bot",
          },
        ]);

        if (dummyResponse.answer.image) {
          // Add loading state for the image
          const imageMessageId = textMessageId + 1;
          setChatHistory((prev) => [
            ...prev,
            {
              id: imageMessageId,
              message: "",
              sender: "bot",
              loadingImage: true,
            },
          ]);

          setTimeout(() => {
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === imageMessageId
                  ? { ...msg, message: `이미지가 생성되었습니다`, image: dummyResponse.answer.image, loadingImage: false }
                  : msg
              )
            );
          }, 5000);
        }

        setChatHistory((prev) => [
          ...prev,
          {
            id: textMessageId + 2,
            message: `NFT가 생성되었습니다. Token ID: 123456`,
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
