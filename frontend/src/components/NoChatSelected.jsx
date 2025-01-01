import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full p-16 flex flex-1 flex-col items-center justify-center bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon ChatApp */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary/10 flex justify-center items-center animate-bounce">
              <MessageSquare className="size-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Title */}
        <h2 className="text-2xl font-bold">Welcome to ChatApp! 👋</h2>
        <p className="text-base-content/60">
          Choose a user from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
