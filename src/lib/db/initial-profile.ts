import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user)  return redirect('/sign-in')


  const chatUser = await db
    .select()
    .from(users)
    .where(eq(users.userId, user?.id) );

  if (chatUser.length > 0) return chatUser[0];

  const newChatUser = await db.insert(users).values({
    userId: user?.id,
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.emailAddresses[0].emailAddress,
    imageUrl: user?.imageUrl,
  });

  return newChatUser;
};
