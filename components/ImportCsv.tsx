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
import { Input } from "./ui/input";
import { LoaderCircle } from "lucide-react";

export const ImportCsv = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsDialogOpen(true);
    }
  };

  const handleImport = async () => {
    setIsLoading(true);
    setDisableBtn(true);

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/api/import-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setToastMessage("Products exported successfully");
      setToastType("success");
      console.log("sucesso ao importar");
    } catch (err) {
      setToastMessage("Failed to export products");
      setToastType("error");
      console.log("erro ao importar");
    } finally {
      setIsDialogOpen(false);
      setFile(null);
      setIsLoading(false);
      setDisableBtn(false);
    }
  };

  return (
    <div className="border-b pb-5">
      <p className="text-xl font-bold mb-2">Importar CSV</p>
      <p className="text-md mb-3">
        Ao realizar a operação você trará todos os produtos do arquivo CSV para
        a loja{" "}
      </p>
      <Input type="file" onChange={handleFileChange} disabled={disableBtn} />
      {isLoading && (
        <div className="flex items-center gap-2 font-semibold text-zinc-400 text-sm pt-1 float-right">
          Aguarde
          <LoaderCircle className="animate-spin" width={15} />
        </div>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Import</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to import the selected CSV file? This action
              cannot be undone.
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
