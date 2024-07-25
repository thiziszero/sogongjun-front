import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface MypagePresentationProps {
  userId: string | null;
}

const MypagePresentation: React.FC<MypagePresentationProps> = ({ userId }) => {
  return (
    <Box p={4}>
      <Heading>마이페이지</Heading>
      {userId ? (
        <Text mt={4}>사용자 ID: {userId}</Text>
      ) : (
        <Text mt={4}>로그인이 필요합니다.</Text>
      )}
    </Box>
  );
};

export default MypagePresentation;
