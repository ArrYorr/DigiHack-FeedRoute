import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-700">
        FeedRoute
      </Link>
    </nav>
  );
}

export default Navbar;
