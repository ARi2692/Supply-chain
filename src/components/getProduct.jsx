import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import moment from 'moment'

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

    console.log("Form submitted with supplier:", productID);

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
            <p>{`Product Location : ${product.origin}`}</p>
            <p>{`Product ideal Temperature : ${product.idealTemperature}`}</p>
            <p>{`Product batch Number : ${product.batchNo}`}</p>
            <p>{`Product harvest Date : ${(product.harvestDate>0) ? moment(product.harvestDate).format("MM/DD/YYYY") : 0}`}</p>
            <p>{`Product expiry Date : ${(product.expiryDate>0) ? moment(product.expiryDate).format("MM/DD/YYYY") : 0}`}</p>
            <p>{`Product total Volume : ${product.totalVolume}`}</p>
            <p>{`Product Environmental Info : ${product.envInfo}`}</p>
            <p>{`Product stage : ${product.stage}`}</p>
            {/* set stage to uint according  */}
          </>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
