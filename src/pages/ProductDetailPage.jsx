import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  // useParams reads the dynamic part of the URL (the :productId)
  const { productId } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product Detail Page</h1>
      <p className="mt-4">
        You are viewing the product with ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{productId}</span>
      </p>
      {/* In a real app, you would use this ID to fetch and display the product's data */}
    </div>
  );
}

export default ProductDetailPage;