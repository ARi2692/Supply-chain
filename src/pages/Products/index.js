import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./product.css";
// import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
// import { getConfigByChain } from "../../config";
// import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../components/getProduct";

const Input = styled.input`
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #808080;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

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

const Products = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    productID: 0,
  });

  const handleCheck = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.productID) {
      toast("Please fill all the fields!");
      return;
    }
    console.log("Form submitted with supplier:", formInput?.productID);
    setProductFound(true);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Product</h1>
      </div>

      <div className="product-ID-container">
        <h3> product ID </h3>
        <Input
          type="number"
          id="ID"
          value={formInput.productID}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              productID: e.target.value,
            }))
          }
          required
        />
      </div>

      {productFound && (
        <>
          <Product productID={formInput.productID} />
        </>
      )}

      <div className="submit-buttons">
        <div>
          <Link to="/">
            <SubmitButtonBack type="submit">Back</SubmitButtonBack>
          </Link>
        </div>

        {!productFound && (
          <div>
            <div className="product-submit">
              <div onClick={handleCheck}>
                <SubmitButton type="submit">Check</SubmitButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
