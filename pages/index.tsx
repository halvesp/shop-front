import { ImportProducts } from "@/components/ImportProducts";
import withAuth from "../components/withAuth";
import { Products } from "@/components/ProductsCards";
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
import { ImportCsv } from "@/components/ImportCsv";
import { ExportCsv } from "@/components/ExportCsv";

function Home() {
  return (
    <>
      <div className="flex items-center border-b justify-between mx-4 mb-5 pb-2">
        <p className="text-xl font-semibold">Produtos da loja</p>
        <div className="flex items-center gap-3">
          <ExportCsv />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Importações</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-10">
              <ImportProducts />
              <ImportCsv />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Products />
    </>
  );
}

export default withAuth(Home);
