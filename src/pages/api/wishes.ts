import { db } from "@/server";
import { wish } from "@/server/schema";
import { getWishes } from "@/server/wishes";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const wishes = await getWishes();
    return new Response(JSON.stringify(wishes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

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
