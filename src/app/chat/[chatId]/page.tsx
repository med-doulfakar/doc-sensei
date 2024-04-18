import ChatSidebar from "@/components/ChatSidebar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect, useRouter } from "next/navigation";

interface Props {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const savedChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId));

  if (!savedChats) {
    return redirect("/");
  }
  if (!savedChats.find((c) => c.id === parseInt(chatId))) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSidebar chats={savedChats} chatId={parseInt(chatId)} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
