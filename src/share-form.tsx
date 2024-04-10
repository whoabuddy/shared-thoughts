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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting thought:", { content, context });
    try {
      const response = await fetch("/api/submit-thought", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, context }),
      });
      const data = await response.json();
      console.log("Thought submitted:", data);
      // TODO: add toast 🍞
    } catch (error) {
      console.error("Error submitting thought:", error);
      // TODO: add toast 🍞
    }
  };

  return (
    <Box width="100%">
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
