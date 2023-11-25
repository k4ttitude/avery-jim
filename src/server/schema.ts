import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const wish = pgTable("wishes", {
  id: serial("id").primaryKey(),
  sender: text("sender"),
  message: text("message"),
});
