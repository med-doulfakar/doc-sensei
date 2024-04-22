import { deleteFromS3 } from "@/lib/aws/s3";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { deleteVectorsFromPinecone } from "@/lib/pinecone/pinecone";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth();
    const { chatId } = params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!chatId) return new NextResponse("Chat ID missing", { status: 400 });

    const chat = await db.select().from(chats).where(eq(chats.id, chatId));
    if (!chat) return new NextResponse("Chat doesn't exist", { status: 400 });

    await deleteFromS3(chat[0]?.fileKey);
    await deleteVectorsFromPinecone(chat[0]?.fileKey);
    await db.delete(chats).where(eq(chats.id, chatId));

    return NextResponse.json({});
  } catch (error) {
    console.error("[CHAT DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
