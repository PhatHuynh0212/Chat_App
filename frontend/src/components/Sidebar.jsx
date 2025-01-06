import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlUsers, setShowOnlUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filterOnlUsers = showOnlUsers
    ? users.filter((user) => onlineUsers.includes(user?._id))
    : users;

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
        <div className="mt-3 hidden lg:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlUsers}
              onChange={(e) => setShowOnlUsers(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online users</span>
          </label>
          <span className="text-xs text-gray-500">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="w-full py-3 overflow-y-auto">
        {filterOnlUsers?.map((user) => (
          <button
            key={user?._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user?._id
                ? "bg-accent/50 ring-1 ring-base-300"
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
                <span className="absolute size-3 bottom-0 right-0 bg-green-500 rounded-full ring-1 ring-zinc-900" />
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

        {filterOnlUsers.length === 0 && (
          <div className="py-3 text-center font-bold text-gray-500">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
