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

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImport = async () => {
    try {
      await axios.post("http://localhost:8000/api/import-products");
      setSuccess("Products imported successfully");
      fetchProducts();
    } catch (err) {
      setError("Failed to import products");
    }
  };

  return (
    <div>
      <button
        onClick={handleImport}
        className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Import Products from Fake API
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Price</th>
            <th className="py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2">{product.id}</td>
              <td className="py-2">{product.title}</td>
              <td className="py-2">{product.description}</td>
              <td className="py-2">{product.price}</td>
              <td className="py-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
