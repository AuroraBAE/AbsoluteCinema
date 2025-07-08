import { Link, useNavigate } from "react-router-dom";
import { Hourglass } from "lucide-react";
import googleIcon from "../../assets/google.svg";
import AuthLayout from "./authLayout";
import { useState } from "react";
import { supabase } from "../../libs/supabase";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginWithGoogle } = useAuth();
  

  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Validasi email
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Email tidak valid";
      valid = false;
    }

    // Validasi password
    if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const { data: _user, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        Swal.fire("Gagal", error.message, "error");
      } else {
        Swal.fire({
          icon: "success",
          title: "Berhasil daftar!",
          text: "Silakan cek email Anda untuk verifikasi.",
        }).then(() => navigate("/login"));
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

        <div className="max-w-md w-full">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <h3 className="text-2xl font-bold">Signup</h3>
              <p className="text-slate-400 text-sm">
                Enter your email and password to signup your account
              </p>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
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
              <label htmlFor="password" className="text-sm font-medium">Password</label>
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

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded w-full flex justify-center items-center gap-2"
            >
              {loading ? "Loading..." : "Signup"}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full border px-4 py-2 rounded mt-4"
            >
              <img src={googleIcon} alt="Google" className="w-6 mr-2" />
              Google
            </button>
          </form>
        </div>

        {/* Login Link */}
        <Link
          to="/login"
          onClick={handleLoginWithGoogle}
          className="absolute top-4 right-4 text-sm text-blue-600 hover:underline"
        >
          Login
        </Link>
      </section>
    </AuthLayout>
  );
}
