export async function onRequest(): Promise<Response> {
  return new Response(`Welcome to the SharedThoughts API!`);
}
