import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import MypagePresentation from "./MypagePresentation";

const MypageContainer: React.FC = () => {
  const navigate = useNavigate();
  const context = useAppContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onLogout = () => {
    context.logout();
    navigate(-1);
  };

  const onClickFair = () => {
    navigate("/fair");
  };

  const onBack = () => {
    navigate(-1);
  }

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
    />
  );
};

export default MypageContainer;
