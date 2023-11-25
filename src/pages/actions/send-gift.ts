import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { name, message } = await request.json();
  // insert database record
  return new Response(JSON.stringify({ name, message }), { status: 201 });
};
