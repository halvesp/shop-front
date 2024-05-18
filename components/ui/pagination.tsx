import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const Pagination = ({ children }: { children: React.ReactNode }) => (
  <nav className="flex justify-center mt-4">{children}</nav>
);

export const PaginationContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <ul className="flex space-x-2">{children}</ul>;

export const PaginationItem = ({ children }: { children: React.ReactNode }) => (
  <li>{children}</li>
);

export const PaginationLink = ({
  children,
  onClick,
  isCurrent,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isCurrent?: boolean;
}) => (
  <button
    className={`px-4 py-2 ${
      isCurrent ? "border rounded shadow-sm bg-accent" : "bg-background"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const PaginationPrevious = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    className={`px-4 py-2 mx-2 flex items-center gap-1 rounded ${
      disabled ? "border shadow-sm bg-accent" : "bg-background"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    <ChevronLeft width={15} />
    {children}
  </button>
);

export const PaginationNext = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    className={`px-4 py-2 mx-2 flex items-center gap-1 rounded ${
      disabled ? "border shadow-sm bg-accent" : "bg-background"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
    <ChevronRight width={15} />
  </button>
);
