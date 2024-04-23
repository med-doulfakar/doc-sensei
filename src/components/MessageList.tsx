import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import EmptyMessageList from "./EmptyMessageList";
import Image from "next/image";
import SenseiLogo from "../../public/imgs/sensei-logo.png";

interface MessageListProps {
  messages: Message[];
  isPending: boolean;
  userImg?: string;
}

const MessageList = ({ messages, isPending, userImg }: MessageListProps) => {
  if (!messages) return <></>;

  if (isPending)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  return (
    <div className="flex flex-col gap-2 px-4 pt-4">
      {messages.length === 0 ? (
        <EmptyMessageList />
      ) : (
        messages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn("flex", {
                " flex-row-reverse pl-10 ": message.role === "user",
                " justify-start pr-10": message.role === "assistant",
              })}
            >
              <Image
                src={message?.role === "user" ? userImg : SenseiLogo}
                alt="user profile iamge"
                width={30}
                height={30}
                className={cn("rounded-full  w-8 h-8", {
                  "mr-2": ["assistant", "system"].includes(message?.role),
                  "ml-2": message?.role === "user",
                })}
              />
              <div className="rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10 bg-slate-500 text-white">
                <pre className="overflow-x-auto whitespace-pre-wrap">
                  {message.content}
                </pre>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
