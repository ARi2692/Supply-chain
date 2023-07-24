import React from "react";
import "./product.css";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../components/getProduct";
import QualityAssurance from "../../components/getQualityAssurance";
import Regulator from "../../components/getRegulator";

const ProductDetails = () => {
  const { productID, productStage } = useParams();

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Product detail: </h1>
      </div>
      <Product productID={productID} />
      {productStage >= 1 && (
        <>
          <QualityAssurance productID={productID} />
          {productStage >= 2 && <Regulator productID={productID} />}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
