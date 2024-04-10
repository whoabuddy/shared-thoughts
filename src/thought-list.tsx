import React from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { Thought } from "./types";

const ThoughtList = () => {
  const [thoughts, setThoughts] = React.useState([]);

  React.useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch("/api/get-all-thoughts");
        console.log("Response:", response);
        const data = await response.json();
        console.log("Fetched thoughts:", data);
        setThoughts(data);
      } catch (error) {
        console.error("Error fetching thoughts:", error);
        // TODO: add toast 🍞
      }
    };

    fetchThoughts();
  }, []);

  return (
    <Box width="100%">
      <Heading>Saved Thoughts</Heading>
      <List spacing={4}>
        {thoughts.map((thought: Thought) => (
          <ListItem key={thought.id}>
            <Text fontWeight="bold">{thought.content}</Text>
            <Text fontSize="sm" color="gray.500">
              {thought.context}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ThoughtList;
