import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from "@chakra-ui/react";

import { Icon, Icons } from "../../atoms/Icon";

interface IconButtonProps extends Omit<ChakraIconButtonProps, "icon"> {
  icon: Icons;
  size?: "sm" | "md" | "lg";
}

export function IconButton({ icon, size = "sm", ...props }: IconButtonProps) {
  return (
    <Tooltip
      label={props["aria-label"]}
      placement="top"
      hasArrow
      openDelay={500}
    >
      <ChakraIconButton
        {...props}
        size={size}
        // TODO: Make variants
        bg="grayscale.almostBlack"
        icon={<Icon icon={icon} size={size} color="white" />}
        aria-label={props["aria-label"]}
      />
    </Tooltip>
  );
}
