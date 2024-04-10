import { EventContext } from "@cloudflare/workers-types";

export async function onRequestPost(
  context: EventContext<unknown, string, unknown>
): Promise<Response> {
  const { request } = context;
  const data = await request.json();
  console.log("Received data:", typeof data, data);

  const responseBody = JSON.stringify(`You submitted some data!`);

  return new Response(responseBody, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
