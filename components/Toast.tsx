import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  type: "success" | "error" | "";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed bottom-5 right-5 flex items-center justify-between p-4 rounded shadow-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg">
        &times;
      </button>
    </div>,
    document.body
  );
};

export default Toast;
