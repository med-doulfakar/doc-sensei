import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Monoton } from "next/font/google";
import { cn } from "@/lib/utils";
import { currentProfile } from "@/lib/db/current-profile";

const headerFont = Monoton({ weight: "400", subsets: ["latin"] });


const ChatLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const user = await currentProfile();


  const savedChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, user?.id));

  return (
    <div>
      <div className="sticky top-0 left-0 w-full bg-white text-slate-800 p-4 border-b-2 border-slate-300 z-10">
        <div className="flex flex-row gap-2 items-center">
        <h1
            className={cn(
              headerFont.className,
              "text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
            )}
          >
            DOCUMENT SENSEI
          </h1>
          <div className="flex-1"></div>
          <Link
            href="/"
            className=" text-sm mr-4 p-2 bg-slate-700 text-slate-100 rounded-sm"
          >
            Chats
            {savedChats.length > 0 && (
              <Badge variant="default" className="ml-2">
                {savedChats.length}
              </Badge>
            )}
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;
