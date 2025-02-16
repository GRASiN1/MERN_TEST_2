import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, Logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    navigate("/");
  };
  return (
    <div className="w-full h-16 bg-black text-white flex flex-row justify-around items-center p-4">
      <img src="/images/logo.png" alt="" width={70} />
      <ul className="w-3/5 flex flex-row justify-center items-center gap-5 text-kanit font-bold text-3xl">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/address">Address</NavLink>
      </ul>
      <button
        className="border-1 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
