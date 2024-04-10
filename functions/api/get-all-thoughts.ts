import { EventContext } from "@cloudflare/workers-types";
import { Env } from "../../src/types";

export async function onRequestGet(
  context: EventContext<Env, string, unknown>
): Promise<Response> {
  const { env } = context;

  // Retrieve all thoughts from KV
  const thoughtsList = await env.SHARED_THOUGHTS_V1.list();
  const thoughts = await Promise.all(
    thoughtsList.keys.map(async (key) => {
      const value = (await env.SHARED_THOUGHTS_V1.get(key.name)) || "";
      return { id: key.name, ...JSON.parse(value) };
    })
  );

  const responseBody = JSON.stringify(thoughts);

  return new Response(responseBody, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
