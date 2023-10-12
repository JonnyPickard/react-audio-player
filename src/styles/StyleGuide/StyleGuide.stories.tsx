import { Divider, Heading, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ColorsStyleGuide } from "./Colors.styleguide";
import { IconStyleGuide } from "./Icon.styleguide";
import { IconButtonStyleGuide } from "./IconButton.styleguide";
import { TypeographyStyleGuide } from "./Typeography.styleguide";

const meta = {
  title: "StyleGuide",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const StyleGuide: Story = {
  name: "StyleGuide",
  render: () => (
    <VStack align="start" gap="6">
      <VStack w="100%" align="start">
        <Heading as="h1">StyleGuide</Heading>
        <Divider />
      </VStack>
      <IconStyleGuide />
      <IconButtonStyleGuide />
      <TypeographyStyleGuide />
      <ColorsStyleGuide />
    </VStack>
  ),
};
