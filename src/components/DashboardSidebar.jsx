export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-green-700 text-white p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Buyer Menu</h2>
      <nav className="flex flex-col gap-4">
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
        <a href="/products" className="hover:underline">
          Browse Products
        </a>
        <a href="/orders" className="hover:underline">
          My Orders
        </a>
        <a href="/settings" className="hover:underline">
          Settings
        </a>
      </nav>
      <div className="mt-auto">
        <a
          href="/logout"
          className="block px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-gray-100"
        >
          Logout
        </a>
      </div>
    </aside>
  );
}
