import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBgImage from "../assets/login-bg.jpg"; // Make sure this image path is correct

function CustomerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    
    navigate('/customer-landing');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <div className="relative">
        <img
          src={loginBgImage}
          alt="Organic vegetables at a market"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="relative bg-green-50 p-8 rounded-t-2xl -mt-[95px] flex-grow">
        
        <div className="max-w-sm mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Log in</h1>
          <p className="text-gray-500 mb-6">Welcome to FeedRoute</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="My Username"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*********"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="text-right mb-6">
              <Link to="/forgot-password" className="text-sm font-medium text-gray-600 hover:text-green-700">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-green-600 hover:text-green-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;