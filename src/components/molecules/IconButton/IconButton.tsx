import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Spinner,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Icon, Icons } from "../../atoms/Icon";

const FadeIn = chakra(motion.div);

interface IconButtonProps extends Omit<ChakraIconButtonProps, "icon"> {
  icon: Icons;
  iconColor?: "white" | "lightGray";
  size?: "sm" | "md" | "lg" | "xl";
  hoverAnimation?: boolean;
  isLoading?: boolean;
}

export function IconButton({
  icon,
  iconColor = "white",
  size = "sm",
  hoverAnimation,
  isLoading = false,
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
        _disabled={{
          opacity: 1,
        }}
        isLoading={isLoading}
        spinner={
          <FadeIn
            opacity={0}
            animate={{
              opacity: 1,
            }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: 1,
              repeatType: "loop",
            }}
          >
            <Spinner
              color="grayscale.almostWhite"
              size={size}
              thickness={size === "xl" ? "4px" : "2px"}
            />
          </FadeIn>
        }
        icon={
          <Icon
            icon={icon}
            size={size}
            color={iconColor}
            hoverAnimation={hoverAnimation}
          />
        }
        aria-label={props["aria-label"]}
      />
    </Tooltip>
  );
}
