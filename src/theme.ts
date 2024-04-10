import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Chakra theme configuration
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "shared-thoughts",
};

const fonts = {
  heading: "monospace",
  body: "monospace",
};

const theme = extendTheme({
  config,
  fonts,
});

export default theme;
