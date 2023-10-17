import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from "@chakra-ui/react";

import { Icon, Icons } from "../../atoms/Icon";

interface IconButtonProps extends Omit<ChakraIconButtonProps, "icon"> {
  icon: Icons;
  size?: "sm" | "md" | "lg";
  /* Will Override if provided, otherwise uses design system defaults */
  iconSize?: "sm" | "md" | "lg" | "xl";
  hoverAnimation?: boolean;
}

export function IconButton({
  icon,
  size = "sm",
  iconSize,
  hoverAnimation,
  ...props
}: IconButtonProps) {
  return (
    <Tooltip
      label={props["aria-label"]}
      placement="top"
      hasArrow
      openDelay={500}
      bg="grayscale.lightBlack"
      color="grayscale.almostWhite"
    >
      <ChakraIconButton
        {...props}
        size={size}
        bg="unset"
        _hover={{
          bg: "unset",
        }}
        icon={
          <Icon
            icon={icon}
            size={iconSize || size}
            color="white"
            hoverAnimation={hoverAnimation}
          />
        }
        aria-label={props["aria-label"]}
      />
    </Tooltip>
  );
}
