import ChatComponent from "@/components/ChatComponent";
import ChatSidebar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/db/current-profile";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RocketIcon } from "lucide-react";
import { redirect } from "next/navigation";

interface Props {
  params: {
    chatId?: string[];
  };
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const user = await currentProfile();
  if (!user) {
    return redirect("/sign-in");
  }

  const savedChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, user?.id));

  if (!savedChats) {
    return redirect("/");
  }

  const ChatArea = !!chatId ? (
    <ChatComponent chatId={chatId[0]} user={user} />
  ) : (
    <div className="relative  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
      <div className="flex items-center">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Let's go!</AlertTitle>
          <AlertDescription>
            <p className="text-sm text-slate-600">
              Select a conversation and start chatting with the sensei
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex w-full h-screen overflow-auto">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSidebar chats={savedChats} chatId={chatId}/>
        </div>
        {/* pdf viewer */}
        {/* <div className="max-h-screen p-4 oveflow-auto flex-[5]">
          <PDFViewer pdfUrl={currentChat?.pdfUrl} />
        </div> */}
        {/* chat component */}
        <div className="flex-[3] h-screen border-l-4 border-l-slate-200 overflow-auto">
          {ChatArea}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
