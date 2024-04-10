import { ChakraProvider, Heading, Text } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Heading>Shared Thoughts</Heading>
      <Text>Simple thought offloading tech.</Text>
    </ChakraProvider>
  );
}

export default App;
