"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  show: boolean;
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  show,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div
        className={`${bg} text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2`}
      >
        <span>
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}