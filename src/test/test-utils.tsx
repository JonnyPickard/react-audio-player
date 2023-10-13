import { ChakraProvider } from "@chakra-ui/react";
import { RenderOptions, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { theme } from "theme";

// eslint-disable-next-line
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line
export * from "@testing-library/react";
export { customRender as render };
