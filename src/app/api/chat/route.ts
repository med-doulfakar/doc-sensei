import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { getContext } from "@/lib/pinecone/context";
import { db } from "@/lib/db";
import { chats as Chats, messages as ChatMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { remark } from 'remark';
import html from 'remark-html';

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const _chats = await db.select().from(Chats).where(eq(Chats.id, chatId));
    if (_chats.length != 1)
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    const context = await getContext(lastMessage.content, _chats[0]?.fileKey);

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [prompt, ...messages.filter((m: Message) => m.role === "user")],
      stream: true,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        await db.insert(ChatMessages).values({
          chatId,
          role: "user",
          content: lastMessage.content,
        });
      },
      onCompletion: async (completion) => {
        /* const processedContent = await remark()
          .use(html)
          .process(completion);
        const contentHtml = processedContent.toString(); */
        await db.insert(ChatMessages).values({
          chatId,
          role: "system",
          content: completion,
        });

      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}


