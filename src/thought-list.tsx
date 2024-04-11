import React from "react";
import { Box, List, ListItem, Text, Button, useToast } from "@chakra-ui/react";
import { Thought } from "./types";
import { sleep } from "./helpers";

const ThoughtList = () => {
  const [thoughts, setThoughts] = React.useState<Thought[]>([]);
  const toast = useToast();

  const fetchThoughts = async () => {
    try {
      const response = await fetch("/api/get-all-thoughts");
      console.log("Response:", response);
      const data = await response.json();
      console.log("Fetched thoughts:", data);
      setThoughts(data);
      return data;
    } catch (error) {
      console.error("Error fetching thoughts:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    toast.promise(fetchThoughts(), {
      loading: { title: "Loading thoughts", description: "Please wait..." },
      success: {
        title: "Thoughts loaded",
        description: "Thoughts retrieved successfully",
      },
      error: {
        title: "Error loading thoughts",
        description: "Something went wrong",
      },
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/delete-thought?id=${id}`, { method: "DELETE" });
      // Refresh the thought list after deletion
      await sleep(1000); // pause for 1 second before updating
      toast.promise(fetchThoughts(), {
        loading: { title: "Deleting thought", description: "Please wait..." },
        success: {
          title: "Thought deleted",
          description: "Thought deleted successfully",
        },
        error: {
          title: "Error deleting thought",
          description: "Something went wrong",
        },
      });
    } catch (error) {
      console.error("Error deleting thought:", error);
      toast({
        title: "Error deleting thought 😢",
        description: `Something went wrong, please try again.\nError message: ${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="100%">
      <List spacing={4}>
        {thoughts.length === 0 && (
          <ListItem>
            <Text>No thoughts shared yet.</Text>
          </ListItem>
        )}
        {thoughts.map((thought: Thought) => (
          <ListItem key={thought.id}>
            <Text fontWeight="bold">{thought.content}</Text>
            <Text fontSize="sm" color="gray.500">
              {thought.context}
            </Text>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDelete(thought.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ThoughtList;
