import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const ShareForm = () => {
  const [content, setContent] = React.useState("");
  const [context, setContext] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission logic
    console.log("Content:", content);
    console.log("Context:", context);
  };

  return (
    <Box maxWidth="600px" width="100%" margin="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="content" isRequired>
            <FormLabel>Content</FormLabel>
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content to share"
            />
          </FormControl>
          <FormControl id="context">
            <FormLabel>Context</FormLabel>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Enter related context (optional)"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ShareForm;
