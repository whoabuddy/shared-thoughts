import React from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  useToast,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Thought } from "../utils/types";
import { sleep } from "../utils/helpers";

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
    fetchThoughts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/delete-thought?id=${id}`, { method: "DELETE" });
      // Refresh the thought list after deletion
      await sleep(1000); // pause for 1 second before updating
      fetchThoughts();
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
            <HStack>
              <Box flexGrow={1}>
                <Text fontWeight="bold">{thought.content}</Text>
                <Text fontSize="sm" color="gray.500">
                  {thought.context}
                </Text>
              </Box>
              <IconButton
                isRound
                aria-label="Delete thought"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(thought.id)}
              >
                Delete
              </IconButton>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ThoughtList;
