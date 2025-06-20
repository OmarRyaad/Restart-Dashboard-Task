"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

type ProductFormData = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
};

type ProductModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: ProductFormData;
  onClose: () => void;
  onChange: (field: keyof ProductFormData, value: string) => void;
  onSubmit: () => void;
};

export default function ProductModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onChange,
  onSubmit,
}: ProductModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="relative w-full sm:max-w-md mx-4 sm:mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X />
          </button>

          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            {(
              ["name", "description", "image", "category", "price"] as const
            ).map((field) => (
              <input
                key={field}
                type="text"
                required
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md dark:bg-gray-700 dark:text-white"
              />
            ))}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md"
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
