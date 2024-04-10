export async function onRequstGet(): Promise<Response> {
  return new Response(`Use this link for submissions via POST.`);
}

export async function onRequestPost(): Promise<Response> {
  return new Response(`You sent some data!`);
}
