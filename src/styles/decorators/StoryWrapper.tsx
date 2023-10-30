import { Box } from "@chakra-ui/react";
import type { Decorator } from "@storybook/react";

export const StoryWrapper: Decorator = (story) => {
  return (
    <Box
      bg="grayscale.almostBlack"
      color="white"
      padding={2}
      borderRadius={6}
      w="100%"
    >
      {story()}
    </Box>
  );
};

export const StoryWrapperIcon: Decorator = (story, context) => {
  return (
    <Box
      bg={
        context.args.color === "black"
          ? "grayscale.almostWhite"
          : "grayscale.almostBlack"
      }
      padding={2}
      borderRadius={6}
      w="100%"
    >
      {story()}
    </Box>
  );
};
