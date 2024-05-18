import Link from "next/link";
import withAuth from "../components/withAuth";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-6 text-center">Welcome to Next.js</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/import-products">Import Products</Link>
            </li>
            <li>
              <Link href="/csv-management">CSV Management</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default withAuth(Home);
