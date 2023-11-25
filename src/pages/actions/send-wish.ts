import { db } from "@/server";
import { wish } from "@/server/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { name, message } = await request.json();
  let success = false;
  try {
    await db.insert(wish).values({ sender: name, message });
    success = true;
  } catch (error) {}
  return new Response(JSON.stringify({ success }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
