import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import EmptyMessageList from "./EmptyMessageList";

interface MessageListProps {
  messages: Message[];
  isPending: boolean;
}

const MessageList = ({ messages, isPending }: MessageListProps) => {
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
                "justify-end pl-10": message.role === "user",
                "justify-start pr-10": message.role === "assistant",
              })}
            >
              <div
                className={cn(
                  "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                  {
                    "bg-blue-600 text-white": message.role === "user",
                    "bg-green-600 text-white": ["system", "assistant"].includes(
                      message.role
                    ),
                  }
                )}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
