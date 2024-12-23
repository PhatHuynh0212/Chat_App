import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="sticky w-full top-0 z-40 bg-base-100 border-b border-base-300 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left item */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary-10 flex items-center justify-center">
                <MessageSquare className="size-7 text-primary" />
              </div>
              <span className="text-lg font-bold">ChatApp</span>
            </Link>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-4">
            <Link to="/setting" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Auth user */}
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
