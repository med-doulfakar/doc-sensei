import ChatComponent from "@/components/ChatComponent";
import ChatSidebar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
  if (!savedChats.find((c) => c.id === chatId)) {
    return redirect("/");
  }

  const currentChat = savedChats.find((chat) => chat.id === chatId);

  return (
    <div className="flex w-full max-h-screen overflow-hidden">
      <div className="flex w-full max-h-screen overflow-auto">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSidebar
            chats={savedChats}
            chatId={chatId}
          />
        </div>
        {/* pdf viewer */}
        {/* <div className="max-h-screen p-4 oveflow-auto flex-[5]">
          <PDFViewer pdfUrl={currentChat?.pdfUrl} />
        </div> */}
        {/* chat component */}
        <div className="flex-[3] max-h-screen border-l-4 border-l-slate-200 overflow-auto">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
