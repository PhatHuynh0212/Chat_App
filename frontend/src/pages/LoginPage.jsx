import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import AuthImage from "../components/AuthImage";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      return toast.error("Email is required!");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format!");
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required!");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = validateForm();
    if (validate === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form signup */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/50" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOff className="size-5 text-base-content/50" />
                  ) : (
                    <Eye className="size-5 text-base-content/50" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="text-center">
            {`Don't`} have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImage
        title="Join with us"
        subtitle="Connect with friends, share many moments and stay in touch with yours loves ones."
      />
    </div>
  );
};

export default LoginPage;
