import { create } from "zustand";
import { Product, Store } from "../types";

const useProductsListStore = create<Store>((set) => ({
  products: [],
  addedProducts: [],
  selectedProducts: {},
  deletedProducts: [],

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
      const deletedProducts = Object.keys(state.selectedProducts)
        .map(
          (id) =>
            state.products.find((product) => product.id === id) ||
            state.addedProducts.find((product) => product.id === id),
        )
        .filter((product): product is Product => !!product); // Ensure only Products are kept

      return {
        ...state,
        products: state.products.filter(
          (product) => !state.selectedProducts[product.id],
        ),
        addedProducts: state.addedProducts.filter(
          (product) => !state.selectedProducts[product.id],
        ),
        deletedProducts: [...state.deletedProducts, ...deletedProducts],
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
