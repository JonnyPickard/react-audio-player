// Copied from Chakra
// https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/components/mdx-components/icons-list.tsx
import {
  Button,
  Icon as ChakraIcon,
  Grid,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import type { Meta } from "@storybook/react";

import * as icons from "./Icons";

const meta: Meta<typeof ChakraIcon> = {
  title: "Icons",
};

export default meta;

const iconList = {
  ChevronDown: icons.ChevronDown,
  ChevronUp: icons.ChevronUp,
  PauseCircle: icons.PauseCircle,
  PlayCircle: icons.PlayCircle,
  Repeat: icons.Repeat,
  StepBackward: icons.StepBackward,
  StepForward: icons.StepForward,
  VolumeHigh: icons.VolumeHigh,
  VolumeLow: icons.VolumeLow,
  VolumeMedium: icons.VolumeMedium,
  VolumeMuted: icons.VolumeMuted,
};

export const Icons = () => {
  const toast = useToast();

  return (
    <Grid
      mt={7}
      gap={5}
      templateColumns="repeat( auto-fit, minmax(150px, 1fr) )"
    >
      {(Object.keys(iconList) as Array<keyof typeof iconList>).map((key, i) => {
        const Icon = iconList[key];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { onCopy } = useClipboard(key);

        const onCopyIcon = () => {
          onCopy();

          toast({
            title: `'${key}' copied to clipboard`,
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        };

        return (
          <Button
            pt={9}
            pb={9}
            onClick={() => onCopyIcon()}
            key={i}
            textAlign="center"
            variant="outline"
            flexDir="column"
            justifyContent="center"
          >
            <Icon boxSize={6} />
            <Text
              as="span"
              mt={3}
              fontSize="sm"
              fontWeight="normal"
              textAlign="center"
            >
              {key}
            </Text>
          </Button>
        );
      })}
    </Grid>
  );
};
