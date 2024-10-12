import useProductsListStore from "@pages/shopping-list/store";
import { Product } from "@pages/shopping-list/types";
import React from "react";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { selectedProducts, toggleProductSelection } = useProductsListStore(
    (state) => state
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pt-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 border-gray-950 flex items-center justify-between"
        >
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <div className="border border-gray-500 rounded-md w-12">
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 rounded-md"
              />
            </div>
            <span className="ml-4 text-md flex-1 truncate whitespace-nowrap overflow-hidden">
              {product.title}
            </span>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 accent-gray-500"
            checked={!!selectedProducts[product.id]}
            onChange={() => toggleProductSelection(product.id)}
          />
        </div>
      ))}
    </div>
  );
};
