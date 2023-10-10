import * as icons from "./Icons";

interface IconProps {
  icon: icons.Icons;
  size?: "sm" | "md" | "lg";
}

const fallbackIcon = icons.AllIcons.ChevronDown;

export const Icon = ({ icon = fallbackIcon, size = "sm" }: IconProps) => {
  const ChosenIcon = icons[icon];

  return <ChosenIcon variant={size} />;
};
