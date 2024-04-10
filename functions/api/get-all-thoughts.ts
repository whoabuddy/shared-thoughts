import { Thought } from "../../src/types";

export async function onRequestGet(): Promise<Response> {
  // Placeholder data
  const thoughts: Thought[] = [
    { id: 1, content: "Thought 1", context: "Context 1" },
    { id: 2, content: "Thought 2", context: "Context 2" },
    { id: 3, content: "Thought 3", context: "Context 3" },
  ];

  const responseBody = JSON.stringify(thoughts);

  return new Response(responseBody, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
