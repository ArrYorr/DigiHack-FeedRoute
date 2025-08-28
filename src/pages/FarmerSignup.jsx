import { Link } from "react-router-dom";

function FarmerSignup() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Farmer Signup</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Farm Location"
            className="p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/farmer-login" className="text-green-700 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default FarmerSignup;
