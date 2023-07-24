import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { Link } from "react-router-dom";

const ProductCard = ({ productID }) => {
  const { chain } = useNetwork();
  const [productName, setProductName] = useState("");
  const [productStage, setProductStage] = useState(0);

  useEffect(() => {
    if (productID !== undefined) {
      getAllProducts();
    }
  }, [productID]);

  const getAllProducts = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.getProduct(productID - 1);
    setProductName(tx.productName);
    setProductStage(parseInt(tx.stage));
  };

  return (
    <div>
      <div>
        <p>{`Product ID : ${productID}`}</p>
        <p>{`Product Name : ${productName}`}</p>
        <Link to={`/product/${productID}/${productStage}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
