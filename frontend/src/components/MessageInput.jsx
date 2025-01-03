import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) {
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image,
      });

      // Clear form
      setText("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  return (
    <div className="px-4 py-3 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-4">
          <div className="relative">
            <img
              src={image}
              alt="Image preview"
              className="size-20 object-cover rounded-lg border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute size-5 -top-2 -right-2 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <div className="flex items-center flex-1 gap-2">
          <input
            type="text"
            placeholder="Type message..."
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`sm:flex btn btn-sm sm:btn-md btn-circle ${
              image ? "text-emerald-500" : "text-gray-400"
            }`}
          >
            <Image className="size-5 sm:size-6" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !image}
          className="btn btn-sm sm:btn btn-accent"
        >
          <Send className="size-5 sm:size-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
