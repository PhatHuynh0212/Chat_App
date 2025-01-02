import { THEMES } from "../constant/index.js";
import { useThemeStore } from "../store/useThemeStore.js";
import PreviewChat from "../components/PreviewChat.jsx";

const SettingPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen max-w5xl container mx-auto px-4 pt-20">
      <div className="space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Theme</h2>
          <p className="text-sm text-base-content/80">
            Choose a theme to change color for your chat interface
          </p>
        </div>

        {/* Themes */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className={`group flex flex-col items-center gap-2 p-2 rounded-lg transition-colors ${
                th === theme ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={th}
              >
                <div className="absolute inset-0 grid grid-cols-4 p-1 gap-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="w-full text-center text-xs font-medium truncate">
                {th.charAt(0).toUpperCase() + th.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview section */}
        <PreviewChat />
      </div>
    </div>
  );
};

export default SettingPage;
