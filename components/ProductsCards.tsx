import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products", {
          params: {
            page: currentPage,
            limit: productsPerPage,
          },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 cover mb-4 m-auto pb-2"
              />
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {product.description.length > 100 ? (
                  <>
                    {product.description.substring(0, 100)}...
                    <button
                      onClick={() => openModal(product)}
                      className="text-blue-500"
                    >
                      Ler mais
                    </button>
                  </>
                ) : (
                  product.description
                )}
              </p>
            </CardContent>
            <CardFooter>
              <p className="font-bold text-primary text-xl">{product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationPrevious
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationPrevious>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isCurrent={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationNext>
      </Pagination>

      {selectedProduct && (
        <AlertDialog open={isModalOpen} onOpenChange={closeModal}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="hidden">
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <img
                src={`${selectedProduct.image}`}
                width={200}
                className="mx-auto pb-2"
              />
              <AlertDialogTitle>{selectedProduct.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedProduct.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
