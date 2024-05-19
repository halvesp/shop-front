import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div className="flex items-center text-zinc-100 w-full drop-shadow fixed z-40">
      <div className="bg-background w-full p-4 px-8 flex justify-between items-center">
        <img src="/logo2.png" width={170} alt="Logo" />
        <Button
          onClick={handleLogout}
          className="bg-background border-0 text-secondary flex items-center gap-2 text-md hover:bg-accent"
        >
          Sair
          <LogOut width={20} />
        </Button>
      </div>
    </div>
  );
}
