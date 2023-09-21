import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export function IconButton(props: IconButtonProps) {
  return (
    <ChakraIconButton
      onClick={props.onClick}
      icon={props.icon}
      aria-label={props["aria-label"]}
    />
  );
}
