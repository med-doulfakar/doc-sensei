import { auth } from "@clerk/nextjs";
import { db } from ".";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const profile = await db.select().from(users).where(eq(users.userId , userId))
  return profile[0];
};
