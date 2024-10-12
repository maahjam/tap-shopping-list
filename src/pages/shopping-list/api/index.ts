import products from "../../../../public/mockData/products.json";
import { getProductsListTransformer } from "../transformers";
import { PaginatedProductsList, Product } from "../types";

export const fetchProducts = async ({
  currentPage,
}: {
  currentPage: number;
}): Promise<PaginatedProductsList> => {
  const pageSize = 5;
  const totalItems = products.products.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const skip = (currentPage - 1) * pageSize;
  const paginatedProducts = products.products.slice(skip, skip + pageSize);

  const paginatedData = {
    products: paginatedProducts,
    pager: {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
    },
  };

  // Use the transformer to convert the mock data to the correct format
  return getProductsListTransformer(paginatedData);
};
