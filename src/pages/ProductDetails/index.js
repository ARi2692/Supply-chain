import React from "react";
import "./product.css";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../components/getProduct";
import QualityAssurance from "../../components/getQualityAssurance";
import Regulator from "../../components/getRegulator";

const SubmitButtonBack = styled.button`
  background-color: #e8e8e8;
  color: #696969;
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductDetails = () => {
  const { productID, productStage } = useParams();

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Product detail: </h1>
      </div>
      <Product productID={productID} />
      {productStage >= 2 && (
        <>
          <Regulator productID={productID} />
          {productStage >= 3 && <QualityAssurance productID={productID} />}
        </>
      )}
      <div className="submit-buttons">
        <div>
          <Link to="/product">
            <SubmitButtonBack type="submit">Back</SubmitButtonBack>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
