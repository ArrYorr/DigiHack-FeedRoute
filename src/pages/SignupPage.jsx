import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
