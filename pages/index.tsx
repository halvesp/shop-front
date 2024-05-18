import Link from "next/link";
import withAuth from "../components/withAuth";
import { Products } from "@/components/ProductsCards";

function Home() {
  return (
    <>
      <Products />
    </>
  );
}

export default withAuth(Home);
