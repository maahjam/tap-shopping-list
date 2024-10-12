import React from "react";

interface AddProductFormProps {
  newProductName: string;
  onProductNameChange: (name: string) => void;
  onAddProduct: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  newProductName,
  onProductNameChange,
  onAddProduct,
}) => {
  return (
    <div className="flex flex-col justify-between items-center p-4 gap-4">
      <input
        type="text"
        value={newProductName}
        onChange={(e) => onProductNameChange(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="New Product Name"
      />
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={onAddProduct}
      >
        Add to list
      </button>
    </div>
  );
};
