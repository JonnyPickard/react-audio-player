import { Icon, IconProps } from "@chakra-ui/react";

export const ChevronUp = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="48"
      d="M112 328l144-144 144 144"
    />
  </Icon>
);
