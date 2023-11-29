import { desc } from "drizzle-orm";
import { db } from "./db";
import { wish } from "./schema";

export type Wish = typeof wish.$inferSelect;

export const getWishes = async () => {
  const wishes = await db.select().from(wish).orderBy(desc(wish.id));
  return wishes;
};
