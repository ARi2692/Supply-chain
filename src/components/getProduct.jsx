import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";


const GetProduct = ({ productID }) => {
  const { chain } = useNetwork();
  //   const [productDetails, setProductDetails] = useState([]);
  const [product, setProduct] = useState({});
  const [productFound, setProductFound] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [productID]);

  const getAllProducts = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    console.log("Form submitted with manufacturer:", productID);

    const tx = await contract.getProduct(productID - 1);
    setProduct(tx);
    setProductFound(true);
  };

  return (
    <div>
      <div>
        {productFound && (
          <>
            <p>{`Product Name : ${product.productName}`}</p>
            <p>{`Product origin : ${product.origin}`}</p>
            <p>{`Product idealTemperature : ${product.idealTemperature}`}</p>
            <p>{`Product batchNo : ${product.batchNo}`}</p>
            <p>{`Product expiryDate : ${product.expiryDate}`}</p>
            <p>{`Product totalVolume : ${product.totalVolume}`}</p>
            <p>{`Product instructions : ${product.instructions}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
