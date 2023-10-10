import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from "@chakra-ui/react";

import * as icons from "../Icon/Icons";

type CustomIconType = {
  [name: string]: keyof typeof icons;
};

interface IconButtonProps extends ChakraIconButtonProps {
  customIcon: CustomIconType;
}

export function IconButton(props: IconButtonProps) {
  const CustomIcon = icons["ChevronDown"];

  return (
    <Tooltip
      label={props["aria-label"]}
      placement="top"
      hasArrow
      openDelay={500}
    >
      <ChakraIconButton
        {...props}
        icon={<CustomIcon />}
        aria-label={props["aria-label"]}
      />
    </Tooltip>
  );
}
