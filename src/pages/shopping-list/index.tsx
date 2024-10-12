import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import { PaginatedProductsList, Product, QueryPageState } from "./types";
import useProductsListStore from "./store";

import fallback from "@assets/fallback.png";
import Pagination from "@components/pagination";
import Loading from "@components/loading";
import ErrorMessage from "@components/error";
import { Header } from "./components/header";
import { ProductList } from "./components/product-list";
import { AddProductForm } from "./components/add-product-form";

const DEFAULT_PAGE_NUMBER = 1;

const ProductsList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newProductName, setNewProductName] = useState<string>("");

  const initialState = {
    currentPage: parseInt(
      searchParams.get("page") || DEFAULT_PAGE_NUMBER.toString(),
      10,
    ),
  };

  const [pageQueryState, setPageQueryState] =
    useState<QueryPageState>(initialState);

  const {
    setProducts,
    products,
    addProduct,
    addedProducts,
    removeSelectedProducts,
  } = useProductsListStore((state) => state);

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["products", pageQueryState.currentPage],
    queryFn: () => fetchProducts({ currentPage: pageQueryState.currentPage }),
  });

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products as Product[]);
    }
  }, [data, setProducts]);

  const handlePageChange = (page: number) => {
    setPageQueryState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  useEffect(() => {
    refetch();
  }, [pageQueryState.currentPage, refetch]);

  const handleAddProduct = () => {
    if (newProductName.trim()) {
      const newProduct: Product = {
        id: Date.now().toString(),
        title: newProductName,
        image: fallback,
        price: Math.random() * 100,
        description: "Newly added product",
      };
      addProduct(newProduct, pageQueryState.currentPage);
      setNewProductName("");
    }
  };

  const handleClearProducts = () => {
    removeSelectedProducts();
  };

  const filteredAddedProducts = addedProducts.filter(
    (product) => product.page === pageQueryState.currentPage,
  );

  // Merge fetched products with locally added products before rendering
  const mergedProducts = [...products, ...filteredAddedProducts];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div className="flex flex-col w-full  h-full">
      <Header onClear={handleClearProducts} />

      <ProductList products={mergedProducts} />

      <AddProductForm
        newProductName={newProductName}
        onProductNameChange={setNewProductName}
        onAddProduct={handleAddProduct}
      />

      <div className="p-4 bg-white border-t border-gray-300">
        <Pagination
          totalPages={(data as PaginatedProductsList)?.pager.totalPages}
          currentPage={pageQueryState.currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsList;
