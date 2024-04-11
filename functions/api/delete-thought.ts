import { EventContext } from "@cloudflare/workers-types";
import { Env } from "../../src/utils/types";

export async function onRequestDelete(
  context: EventContext<Env, string, unknown>
): Promise<Response> {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing thought ID", { status: 400 });
  }

  await env.SHARED_THOUGHTS_V1.delete(id);

  const responseBody = JSON.stringify(`Thought deleted with ID: ${id}`);

  return new Response(responseBody, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
