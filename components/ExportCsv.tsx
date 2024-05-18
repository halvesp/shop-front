import { useState } from "react";
import axios from "axios";
import withAuth from "../components/withAuth";
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

export const ExportCsv = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setToastMessage("Products exported successfully");
      setToastType("success");
    } catch (err) {
      setToastMessage("Failed to export products");
      setToastType("error");
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-accent hover:text-zinc-100"
          >
            Exportar para CSV
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exportação</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja exportar os produtos para um arquivo
              CSV?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleExport} className="text-white">
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
