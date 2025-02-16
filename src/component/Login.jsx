import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { user, Login, Signup } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      formData.username === "" ||
      formData.password === "" ||
      formData.email === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const res = await Signup(formData);
    if (res) {
      navigate("/home");
    } else {
      alert("Signup failed");
      navigate("/");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.password === "" || formData.email === "") {
      alert("Please fill all the fields");
      return;
    }
    const res = await Login(formData);
    if (res) {
      navigate("/home");
    } else {
      alert("Login failed");
      navigate("/");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!isLogin ? (
        <form
          onSubmit={handleSignUp}
          className="w-1/3 h-1/2 border-2 shadow-md border-black rounded-xl flex flex-col justify-center items-center gap-4 p-4"
        >
          <input
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-2 border rounded-lg outline-none focus:bg-black focus:text-white transition-all duration-300"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded-lg outline-none focus:bg-black focus:text-white transition-all duration-300"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded-lg outline-none focus:bg-black focus:text-white transition-all duration-300"
            type="text"
            name="password"
            placeholder="Password"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:border-2 hover:text-black transition-all duration-300"
            type="submit"
          >
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </p>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="w-1/3 h-1/2 border-2 shadow-md border-black rounded-xl flex flex-col justify-center items-center gap-4 p-4"
        >
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded-lg outline-none focus:bg-black focus:text-white transition-all duration-300"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded-lg outline-none focus:bg-black focus:text-white transition-all duration-300"
            type="text"
            name="password"
            placeholder="Password"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:border-2 hover:text-black transition-all duration-300"
            type="submit"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Signup
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
