
import { Chat } from "@/components/chat/chat";

export default function chat() {
  return (
    <main className="relative container flex min-h-screen flex-col">
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat  />
        </div>
      </div>
    </main>
  );
}
