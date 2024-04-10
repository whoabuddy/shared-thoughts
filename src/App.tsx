import { ChakraProvider, Heading, Stack, Text } from "@chakra-ui/react";
import theme from "./theme";
import ShareForm from "./share-form";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Stack spacing={4} padding={4} alignItems="center">
        <Heading>Shared Thoughts</Heading>
        <Text>Simple thought offloading tech.</Text>
        <ShareForm />
      </Stack>
    </ChakraProvider>
  );
}

export default App;
