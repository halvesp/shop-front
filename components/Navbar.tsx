import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center text-zinc-100 w-full drop-shadow fixed">
      <div className="bg-background w-full p-4 px-8 flex gap-5">
        <img src="/logo2.png" width={170} />
        <Sheet>
          <SheetTrigger asChild className="text-foreground">
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="text-foreground">
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
