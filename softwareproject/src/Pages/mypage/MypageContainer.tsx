import React from "react";
import { useAppContext } from "../../AppContext";
import MypagePresentation from "./MypagePresentation";

const MypageContainer: React.FC = () => {
  const { userId } = useAppContext();

  return <MypagePresentation userId={userId} />;
};

export default MypageContainer;
