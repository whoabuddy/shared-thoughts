import { EventContext } from "@cloudflare/workers-types";
import { Env } from "../../src/utils/types";

export async function onRequestPost(
  context: EventContext<Env, string, unknown>
): Promise<Response> {
  const { request, env } = context;
  const data = await request.json();
  console.log("Received data:", typeof data, data);

  // Generate a unique ID for the thought (you can use a better ID generation strategy if needed)
  const id = Date.now().toString();

  // Store the thought in KV
  await env.SHARED_THOUGHTS_V1.put(id, JSON.stringify(data));

  const responseBody = JSON.stringify(`Thought submitted with ID: ${id}`);

  return new Response(responseBody, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
