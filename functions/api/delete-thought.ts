import { EventContext } from "@cloudflare/workers-types";
import { Env } from "../../src/types";

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

  return new Response("Thought deleted", { status: 200 });
}
