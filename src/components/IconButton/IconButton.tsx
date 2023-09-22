import {
  IconButton as ChakraIconButton,
  IconButtonProps,
  Tooltip,
} from "@chakra-ui/react";

export function IconButton(props: IconButtonProps) {
  return (
    <Tooltip
      label={props["aria-label"]}
      placement="top"
      hasArrow
      openDelay={500}
    >
      <ChakraIconButton
        size="lg"
        onClick={props.onClick}
        icon={props.icon}
        aria-label={props["aria-label"]}
      />
    </Tooltip>
  );
}
