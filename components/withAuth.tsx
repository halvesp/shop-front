import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return (
      <>
        <Navbar />
        <div className="pt-24 px-4 pb-5">
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };

  return AuthComponent;
};

export default withAuth;
