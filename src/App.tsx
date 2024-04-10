import { ChakraProvider, Heading, Stack, Text } from "@chakra-ui/react";
import theme from "./theme";
import ShareForm from "./share-form";
import ThoughtList from "./thought-list";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Stack
        spacing={4}
        padding={4}
        alignItems="center"
        maxWidth="600px"
        margin="auto"
      >
        <Heading>Shared Thoughts</Heading>
        <Text>Share your thoughts, clear your mind.</Text>
        <ShareForm />
        <Heading>Saved Thoughts</Heading>
        <ThoughtList />
      </Stack>
    </ChakraProvider>
  );
}

export default App;
