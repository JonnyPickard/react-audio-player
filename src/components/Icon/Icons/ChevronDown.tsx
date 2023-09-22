import { Icon, IconProps } from "@chakra-ui/react";

export const ChevronDown = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M112 184l144 144 144-144"
    />
  </Icon>
);
