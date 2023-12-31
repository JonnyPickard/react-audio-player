import { Icon, IconProps } from "@chakra-ui/react";

export const PauseCircle = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512">
    <path
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M208 192v128M304 192v128"
    />
  </Icon>
);
