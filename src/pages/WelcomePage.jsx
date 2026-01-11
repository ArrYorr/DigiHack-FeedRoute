import { Link } from "react-router-dom";
import bgImage from "../assets/welcome-bg.jpg";

function WelcomePage() {
  return (
    // Blue border classes removed for full-screen look
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full min-h-screen px-6 py-10">
        {/* Text in the middle */}
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <div className="bg-black/40 p-10 rounded-2xl shadow-lg w-full max-w-md">
            <h1 className="text-4xl font-bold text-white font-roboto">
              Feed<span className="font-extrabold">Route</span>
            </h1>
            <p className="text-sm text-gray-200 mt-2">
              Sell your crops directly, earn more.
            </p>
          </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="absolute bottom-10 left-6 right-6 flex flex-col space-y-4">
          <Link
            to="/farmer-login"
            className="w-full bg-white text-green-700 font-semibold py-3 rounded-full text-center shadow-md hover:bg-gray-100 transition"
          >
            Login as a Farmer
          </Link>
          <Link
            to="/customer-login"
            className="w-full border border-white text-white font-semibold py-3 rounded-full text-center hover:bg-white hover:text-green-700 transition"
          >
            Login as a Customer
          </Link>

          {/* --- NEW SIGN UP BUTTON --- */}
          {/* This gives new users a clear path without digging through login screens */}
          <div className="pt-2">
             <p className="text-white text-center text-sm mb-2 opacity-90">New here?</p>
             <Link
              to="/signup"
              className="block w-full bg-green-600 bg-opacity-80 text-white font-semibold py-3 rounded-full text-center hover:bg-green-700 transition backdrop-blur-sm"
            >
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WelcomePage;