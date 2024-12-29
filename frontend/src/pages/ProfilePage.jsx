import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-lg mt-2">Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Profile image"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-110 
                  p-2 rounded-full cursor-pointer transition-all duration-200 
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-zinc-500 text-sm">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your avatar"}
            </p>
          </div>

          {/* User information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-gray-700 flex items-center gap-2">
                <User className="size-5" />
                Full name
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gray-700 flex items-center gap-2">
                <Mail className="size-5" />
                Email Address
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 ">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member since:</span>
                <span className="text-blue-500">
                  {authUser.createdAt
                    ?.split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
