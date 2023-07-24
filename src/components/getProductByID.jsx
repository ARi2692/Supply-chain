import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const GetProducts = ({ productsLength }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (productsLength !== undefined) {
      getProductsList();
    }
  }, [productsLength]);

  const getProductsList = () => {
    for (let i = 0; i < productsLength; i++) {
      setProductList((oldArray) => [...oldArray, i + 1]);
    }
  };

  return (
    <div>
      <div>
        <>
          {productList.map((productID) => (
            <ProductCard productID={productID} />
          ))}
        </>
      </div>
    </div>
  );
};

export default GetProducts;
