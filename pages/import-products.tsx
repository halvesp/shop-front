import { useState } from "react";
import axios from "axios";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

export default function ImportProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleImport = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/import-products"
            );
            if (response.data.products) {
                setProducts(response.data.products);
                setSuccess("Products imported successfully");
            } else {
                setError("No products found in the response");
            }
        } catch (err) {
            setError("Failed to import products");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h1 className="text-2xl mb-6 text-center">Import Products</h1>
                <button
                    onClick={handleImport}
                    className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Import Products from Fake API
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
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
                                    <td className="border px-4 py-2">
                                        {product.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.price}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center py-4">
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
