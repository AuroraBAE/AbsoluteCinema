import { Link, useNavigate } from "react-router-dom";
import { Hourglass, Loader2 } from "lucide-react";
import googleIcon from "../../assets/google.svg";
import AuthLayout from "./authLayout";
import { useState } from "react";
import { supabase } from "../../libs/supabase";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { handleLoginWithGoogle } = useAuth();

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Email tidak valid";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data)
      if (error) {
        Swal.fire("Gagal", error.message, "error");
      } else {
        Swal.fire("Berhasil", "Login berhasil!", "success").then(() => {
          navigate("/");
        });
      }
    } catch (err) {
      console.log(err)
      Swal.fire("Error", "Terjadi kesalahan server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="p-8 flex flex-col justify-center items-center relative bg-white">
        {/* Mobile Header */}
        <div className="flex items-center gap-x-1 font-semibold text-slate-700 absolute left-7 top-6 text-sm md:hidden">
          <Hourglass size={18} />
          <h3>Pomotimer</h3>
        </div>

        <form className="max-w-md w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <h3 className="text-2xl font-bold">Login</h3>
            <p className="text-slate-400 text-sm">
              Enter your email and password to login your account
            </p>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded w-full flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center w-full border px-4 py-2 rounded"
          >
            <img src={googleIcon} alt="Google" className="w-6 mr-2" />
            Google
          </button>
        </form>

        {/* Signup Link */}
        <Link
          to="/register"
          className="absolute top-4 right-4 text-sm text-blue-600 hover:underline"
        >
          Register
        </Link>
      </section>
    </AuthLayout>
  );
}
