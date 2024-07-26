import React from "react";
import { useAppContext } from "../../AppContext";
import MypagePresentation from "./MypagePresentation";

const MypageContainer: React.FC = () => {
  const context = useAppContext();

  return <MypagePresentation userId={context.userId} />;
};

export default MypageContainer;
