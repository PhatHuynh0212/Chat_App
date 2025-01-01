import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonUsers = Array(7).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 border-r border-base-300">
      {/* Header */}
      <div className="w-full p-4 border-b border-base-300">
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Users List*/}
      <div className="w-full py-3 overflow-y-auto">
        {skeletonUsers.map((s, index) => (
          <div key={index} className="w-full p-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full"></div>
            </div>

            {/* User info */}
            <div className="hidden lg:block min-w-0 text-left flex-1">
              <div className="skeleton h-4 w-32 mb-2"></div>
              <div className="skeleton h-3 w-14"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
