import { Send } from "lucide-react";
import { THEMES } from "../constant/index.js";
import { useThemeStore } from "../store/useThemeStore.js";

const PREVIEW_MESSAGE = [
  { id: 1, content: "Hey! How are you doing today?", isSent: false },
  { id: 2, content: "Great! Just learning web developer.", isSent: true },
];

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
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="rounded-lg border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-xl mx-auto">
              {/* Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      PH
                    </div>
                    <div className="">
                      <h3 className="font-medium text-sm">Phat Huynh</h3>
                      <p className="text-xs text-base-content/70 text-green-600">
                        Online
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat message */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGE.map((mess) => (
                    <div
                      key={mess.id}
                      className={`flex ${
                        mess.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                          mess.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{mess.content}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            mess.isSent
                              ? "text-primary-content/70 text-right"
                              : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter a message..."
                      value="And you?"
                      className="input input-bordered flex-1 text-sm h-10"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
