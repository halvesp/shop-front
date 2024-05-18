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

  const handleImport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/import-products"
      );
      if (response.data.products) {
        setProducts(response.data.products);
        setToastMessage("Products exported successfully");
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
    }
  };

  return (
    <div className="border-b pb-5">
      <p className="text-xl font-bold mb-2">Importar produtos</p>
      <p className="text-md mb-3">
        Ao realizar a operação você trará todos os produtos da FakeStore API{" "}
      </p>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button className="float-right text-white">Importar produtos</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Import</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to import products from the Fake API? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} className="text-white">
              Confirm
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
