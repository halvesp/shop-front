import { useState } from "react";
import axios from "axios";
import withAuth from "../components/withAuth";

function CsvManagement() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/export-products",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      setSuccess("Products exported successfully");
    } catch (err) {
      setError("Failed to export products");
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/api/import-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Products imported successfully");
    } catch (err) {
      setError("Failed to import products");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl mb-6 text-center">CSV Management</h1>
        <button
          onClick={handleExport}
          className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Export Products to CSV
        </button>
        <input
          type="file"
          onChange={handleImport}
          className="w-full py-2 mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
}

export default withAuth(CsvManagement);
