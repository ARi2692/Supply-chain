import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import moment from "moment";

const GetProduct = ({ productID }) => {
  const { chain } = useNetwork();
  const [product, setProduct] = useState({});
  const [stageAt, setStage] = useState("");
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

    console.log(tx);
    console.log(tx.stage);
    const stage = parseInt(tx.stage);
    if (stage === 0) {
      setStage("Farmer delivered");
    } else if (stage === 1) {
      setStage("Supplier processed");
    } else if (stage === 2) {
      setStage("Regulator checked");
    } else if (stage === 3) {
      setStage("Quality Assurances done!");
    } else if (stage === 4) {
      setStage("Distributor moved");
    } else if (stage === 5) {
      setStage("Logistics started delivering!");
    } else if (stage === 6) {
      setStage("Retailer received!");
    }
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
            <p>{`Product harvest Date : ${
              product.harvestDate > 0
                ? moment.unix(product.harvestDate).format("YYYY-MM-DD")
                : 0
            }`}</p>
            <p>{`Product expiry Date : ${
              product.expiryDate > 0
                ? moment.unix(product.expiryDate).format("YYYY-MM-DD")
                : 0
            }`}</p>
            <p>{`Product total Volume : ${product.totalVolume}`}</p>
            <p>{`Product Environmental Info : ${product.envInfo}`}</p>
            <p>{`Product stage : ${stageAt}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
