import {
  Slider as ChakraSlider,
  SliderProps as ChakraSliderProps,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface SliderProps extends ChakraSliderProps {
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function Slider({ variant = "desktop", ...props }: SliderProps) {
  return (
    <ChakraSlider role="group" variant={variant} {...props}>
      <SliderTrack>
        <SliderFilledTrack _groupHover={{ bg: "brand.secondary.light" }} />
      </SliderTrack>
      <SliderThumb _groupHover={{ opacity: "1" }} />
    </ChakraSlider>
  );
}
