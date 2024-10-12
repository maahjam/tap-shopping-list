export interface Product {
  page?: number;
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
}

export interface PaginatedProductsList {
  products: Product[];
  pager: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
}

export interface QueryParams {
  pageSize?: number;
  currentPage: number;
}

export interface QueryPageState {
  currentPage: number;
}

export interface State {
  products: Product[];
  selectedProducts: Record<string, boolean>;
  addedProducts: Product[];
}

export interface Actions {
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product, page: number) => void;
  removeSelectedProducts: () => void;
  toggleProductSelection: (productId: string) => void;
}

export type Store = State & Actions;
