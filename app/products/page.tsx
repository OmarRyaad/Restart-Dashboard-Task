"use client";

import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal/page";

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
};

const apiURL = "https://62fb62afe4bcaf5351837ac1.mockapi.io/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    image: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(apiURL);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const openModal = (product?: Product) => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
        price: product.price,
      });
      setIsEditing(true);
      setEditId(product.id);
    } else {
      setFormData({
        name: "",
        description: "",
        image: "",
        category: "",
        price: "",
      });
      setIsEditing(false);
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing && editId ? `${apiURL}/${editId}` : apiURL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Explore Your Products
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="🔍 Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pr-12 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md space-y-4"
            >
              <div className="w-full aspect-square bg-gray-300 dark:bg-gray-700 rounded-xl" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
              <div className="h-4 bg-blue-300 dark:bg-blue-700 rounded w-1/3 mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5"
            >
              <div className="w-full aspect-square overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                {product.name}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Category: <span className="capitalize">{product.category}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => openModal(product)}
                  className="text-sm px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Component */}
      <ProductModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
