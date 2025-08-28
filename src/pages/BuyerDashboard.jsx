export default function BuyerDashboard() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-green-700 text-white p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Buyer Menu</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/products" className="hover:underline">Products</a>
          <a href="/orders" className="hover:underline">Orders</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-green-700">Welcome, Buyer!</h1>
        <p className="mt-4 text-gray-600">
          Here you can browse products, place orders, and track your purchases.
        </p>
      </div>
    </section>
  );
}
