"use client";
import { ProductWithMedia } from "@/server/service/products/product.schema";
import { use } from "react";
import ProductCard from "./product-card";

type Props = {
  initialData: Promise<ProductWithMedia[]>;
};

const ProductList = ({ initialData }: Props) => {
  const data = use(initialData);
  return (
    <>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
};

export default ProductList;
