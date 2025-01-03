import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 border-r border-base-300">
      <div className="w-full p-5 border-b border-base-300">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* todo: Online User filer */}
      </div>

      {/* Users List */}
      <div className="w-full py-3 overflow-y-auto">
        {users?.map((user) => (
          <button
            key={user?._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user?._id
                ? "bg-base ring-1 ring-base-300"
                : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePic || "/avatar.png"}
                alt={user?.fullName}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute size-3 bottom-0 right-0 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            {/* User info */}
            <div className="hidden lg:block min-w-0 text-left">
              <div className="font-semibold truncate"> {user?.fullName}</div>
              <div className="text-xs text-gray-500">
                {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
