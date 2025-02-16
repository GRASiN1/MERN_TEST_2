import { useContext, useState } from "react";
import { createContext } from "react";
import { api, ENDPOINTS } from "../services/api";

const UserContext = createContext();
const token = localStorage.getItem("token");
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const Login = async (formData) => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      const { tokens, user } = response.data;
      localStorage.setItem("token", tokens.access.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
  const Signup = async (formData) => {
    try {
      const response = await api.post(ENDPOINTS.SIGNUP, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token.access.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
  const Logout = () => {
    localStorage.clear();
    setUser(null);
  };
  const getUser = async () => {
    try {
      const response = await api.get(ENDPOINTS.GET_USER + user._id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      alert(error.message);
    }
  };
  const addAddress = async (address) => {
    console.log(user);
    try {
      const response = await api.put(
        ENDPOINTS.ADD_ADDRESS + user._id,
        { address: JSON.stringify(address) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({ ...user, address: response.data.address });
      alert("Address added successfully");
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
  return (
    <UserContext.Provider
      value={{ user, Login, Signup, Logout, getUser, addAddress }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export { useUser, UserProvider };
