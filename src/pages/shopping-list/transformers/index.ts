import fallback from "@assets/fallback.png";
import { PaginatedProductsList } from "../types";

const getProductsListTransformer = (data: any): PaginatedProductsList => {
  return {
    products: data.products.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.base64Image || fallback,
      price: item.price,
      description: item.description,
    })),
    pager: {
      totalItems: data.pager.totalItems,
      currentPage: data.pager.currentPage,
      pageSize: data.pager.pageSize,
      totalPages: data.pager.totalPages,
    },
  };
};

export { getProductsListTransformer };
