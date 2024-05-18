import { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Toast from "./Toast";
import { LoaderCircle } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export const ImportProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleImport = async () => {
    setIsLoading(true);
    setDisableBtn(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/import-products"
      );
      if (response.data.products) {
        setProducts(response.data.products);
        setToastMessage("Produtos importados com sucesso");
        setToastType("success");
      } else {
        setToastMessage("Nenhum produto foi encontrado");
        setToastType("error");
      }
      setIsDialogOpen(false);
    } catch (err) {
      setIsDialogOpen(false);
      setToastMessage("Falha ao importar produtos");
      setToastType("error");
    } finally {
      setIsLoading(false);
      setDisableBtn(false);
    }
  };

  return (
    <div className="border-b pb-5">
      <p className="text-xl font-bold mb-2 flex items-center gap-2">
        Importar produtos
      </p>
      <p className="text-md mb-3">
        Ao realizar a operação você trará todos os produtos da FakeStore API{" "}
      </p>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <div className="flex items-center justify-between w-full gap-10">
            <Button
              className="bg-accent hover:text-zinc-100"
              disabled={disableBtn}
            >
              Importar produtos
            </Button>
            {isLoading && (
              <div className="flex items-center gap-2 font-semibold text-zinc-400 text-sm">
                Aguarde
                <LoaderCircle className="animate-spin" width={15} />
              </div>
            )}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Importação</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja importar produtos da FakeStore API?
              Essa ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} className="text-white">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};
