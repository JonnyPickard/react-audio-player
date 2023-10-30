import * as icons from "./Icons";

interface IconProps {
  icon: icons.Icons;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "lightGray" | "black";
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
  const hoverColor = color === "black" ? "black" : "white";

  return (
    <ChosenIcon
      variant={`${size}-${color}`}
      _hover={
        hoverAnimation
          ? {
              color: hoverColor,
              fill: hoverColor,
              transform: "scale(1.02)",
              transition: "400ms ease",
            }
          : {}
      }
    />
  );
};
