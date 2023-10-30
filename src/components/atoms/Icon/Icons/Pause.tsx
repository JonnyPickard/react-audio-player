import { Icon, IconProps } from "@chakra-ui/react";

export const Pause = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M176 96h16v320h-16zM320 96h16v320h-16z"
    />
  </Icon>
);
