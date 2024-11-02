import { motion } from 'framer-motion';
import { Box, Image } from "@chakra-ui/react";
const MotionBox = motion(Box);

export const ImageSection = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      flex={1}
      p={2}
      overflow="hidden"
    >
      <Image
        src="./src/pages/auth/register/components/aragoge.svg"
        alt="Login illustration"
        objectFit="cover"
        height="full"
        width="full"
      />
    </MotionBox>
  );
};