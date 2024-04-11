import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

const ShareForm = () => {
  const toast = useToast();
  const [content, setContent] = React.useState("");
  const [context, setContext] = React.useState("");

  // Extract shared data from URL query parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedContent = urlParams.get("text") || urlParams.get("url");
    if (sharedContent) {
      setContent(sharedContent);
    }
  }, []);

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
      setContent("");
      setContext("");
      toast({
        title: "Thought submitted! 🎉",
        description: `Thought submitted with ID: ${data}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting thought:", error);
      toast({
        title: "Error submitting thought 😢",
        description: `Something went wrong, please try again.\nError message: ${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
          <Button type="submit" colorScheme="blue" alignSelf="flex-end">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ShareForm;
