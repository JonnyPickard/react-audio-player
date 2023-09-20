import { Grid, Text, VStack } from "@chakra-ui/layout";
import { IconProps } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import * as AllIcons from "./Icons";

// const meta = {
//   title: "components/Icon",
//   component: AngleDown,
//   parameters: {
//     layout: "centered",
//   },
//   tags: ["autodocs"],
// } satisfies Meta<typeof Icon>;

// export default meta;

export default {
  title: "Icons",
};

export const Icons = () => (
  <Grid gap="8" gridTemplateColumns="repeat(auto-fill, minmax(8rem, 1fr))">
    {Object.entries(AllIcons).map(([key, value]) => {
      const IconComponent = value as React.FC<IconProps>;

      return (
        <React.Fragment key={key}>
          <VStack spacing="3">
            <IconComponent boxSize="40px" />
            <Text>{key}</Text>
          </VStack>
        </React.Fragment>
      );
    })}
  </Grid>
);

// type Story = StoryObj<typeof meta>;

// export const Primary: Story = {};
