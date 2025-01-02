import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-4 py-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Avatar & User info */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="size-10 relative rounded-full">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName}
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold">{selectedUser?.fullName}</h2>
            <div className="text-xs">
              {onlineUsers.includes(selectedUser._id) ? (
                <p className="text-green-600">Online</p>
              ) : (
                <p className="text-base-content/70">Offline</p>
              )}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X className="size-7" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
