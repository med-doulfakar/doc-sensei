import FileUpload from "@/components/shared/FileUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DocUser, chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { Monoton } from "next/font/google";
import { cn } from "@/lib/utils";
import { initialProfile } from "@/lib/db/initial-profile";
import { redirect } from "next/navigation";

const headerFont = Monoton({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  const user  : DocUser= await initialProfile();
  const isAuth = !!user;
  const savedChats = []

  if(user) {
    await db
    .select()
    .from(chats)
    .where(eq(chats.userId, user.id));
  }

  return (
    <div>
      <div className="sticky top-0 left-0 w-full bg-white text-slate-800 p-4">
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
            href="/chat"
            className="text-slate-800 text-sm mr-4 p-2 hover:bg-slate-700 hover:text-slate-100 rounded-sm "
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

      <div className="w-screen min-h-screen bg-gradient-to-r from-red-50 to-rose-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold">
                Chat with our Document Sensei
              </h1>
            </div>

            <div className="flex mt-4">
              {isAuth && <Button>Go to chat</Button>}
            </div>

            <p className="max-w-xl mt-1 text-lg text:slate-600">
              Join thounsands of students and professionals in leveraging te
              power of AI context-focused into understanding complex documents
              in seconds.
            </p>

            <div className="w-full mt-4">
              {isAuth ? (
                <FileUpload />
              ) : (
                <Link href="/sign-in">
                  <Button>
                    Login to get started
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
