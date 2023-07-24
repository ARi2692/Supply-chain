import React, { useState, useEffect } from "react";
import "./product.css";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import GetProducts from "../../components/getProductByID";

const Products = () => {
  const { chain } = useNetwork();
  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    getTheProductsLength();
  });

  const getTheProductsLength = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.getProductsLength();
    setProductsLength(parseInt(tx));
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>All the Products</h1>
      </div>
      <h1> No Of Products: {productsLength} </h1>
      <GetProducts productsLength={productsLength} />
    </div>
  );
};

export default Products;
