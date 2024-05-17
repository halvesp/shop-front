import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export default function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl mb-6 text-center">Products</h1>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
