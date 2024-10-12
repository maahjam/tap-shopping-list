import { create } from "zustand";
import { Product, Store } from "../types";

const useProductsListStore = create<Store>((set) => ({
  products: [],
  addedProducts: [],
  selectedProducts: {},

  setProducts: (products: Product[]) =>
    set((state) => ({
      ...state,
      products,
    })),

  addProduct: (product: Product, page: number) =>
    set((state) => ({
      ...state,
      addedProducts: [...state.addedProducts, { ...product, page }],
    })),

  removeSelectedProducts: () =>
    set((state) => {
      const filteredProducts = state.products.filter(
        (product) => !state.selectedProducts[product.id],
      );
      const filteredAddedProducts = state.addedProducts.filter(
        (product) => !state.selectedProducts[product.id],
      );
      return {
        ...state,
        products: filteredProducts,
        addedProducts: filteredAddedProducts,
        selectedProducts: {},
      };
    }),

  toggleProductSelection: (productId: string) =>
    set((state) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        [productId]: !state.selectedProducts[productId],
      },
    })),
}));

export default useProductsListStore;
