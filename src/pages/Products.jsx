function Products() {
  // Dummy products for placeholder
  const products = [
    { id: 1, name: "Fresh Tomatoes", price: "₦2,500 / basket", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Maize", price: "₦18,000 / bag", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Yam Tubers", price: "₦1,200 / piece", image: "https://via.placeholder.com/150" },
  ];

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-lg" />
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-green-700 font-semibold">{product.price}</p>
            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
