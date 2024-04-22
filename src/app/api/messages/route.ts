import { db } from "@/lib/db";
import { messages as ChatMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chatId } = await req.json();
  if (!chatId)
    return NextResponse.json({ error: "Missing chat ID" }, { status: 404 });

  try {
    const messages = await db
      .select()
      .from(ChatMessages)
      .where(eq(ChatMessages.chatId, chatId));

    if (!messages) {
      return NextResponse.json([], { status: 201 });
    }

    return NextResponse.json(messages, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });

  }
}
