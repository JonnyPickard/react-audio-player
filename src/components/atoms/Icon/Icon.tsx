import * as icons from "./Icons";

interface IconProps {
  icon: icons.Icons;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "black";
  hoverAnimation?: boolean;
}

const fallbackIcon = icons.AllIcons.ChevronDown;

export const Icon = ({
  icon = fallbackIcon,
  size = "sm",
  color = "black",
  hoverAnimation = true,
}: IconProps) => {
  const ChosenIcon = icons[icon];

  return (
    <ChosenIcon
      variant={`${size}-${color}`}
      _hover={
        hoverAnimation
          ? {
              color: color === "white" ? "white" : "black",
              fill: color === "white" ? "white" : "black",
              transform: "scale(1.02)",
              transition: "400ms ease",
            }
          : {}
      }
    />
  );
};
