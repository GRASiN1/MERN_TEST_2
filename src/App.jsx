import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Address from "./component/Address";
function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
