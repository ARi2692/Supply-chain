import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";


const GetRetailer = ({ productID }) => {
  const { chain } = useNetwork();
  //   const [retailerDetails, setRetailerDetails] = useState([]);
  const [retailer, setRetailer] = useState({});
  const [retailerFound, setRetailerFound] = useState(false);

  useEffect(() => {
    getAllRetailers();
  }, [productID]);

  const getAllRetailers = async () => {
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

    const tx = await contract.getRetailer(productID - 1);
    setRetailer(tx);
    setRetailerFound(true);
  };

  return (
    <div>
      <div>
        {retailerFound && (
          <>
            <p>{`Retailer ID : ${retailer.retailerID}`}</p>
            <p>{`Temperature : ${retailer.temperature}`}</p>
            <p>{`Volume : ${retailer.volume}`}</p>
            <p>{`Date Time Received : ${retailer.dateTimeReceived}`}</p>
            <p>{`Compliance Info : ${retailer.complianceInfo}`}</p>
            <p>{`Promotional Info : ${retailer.promotionalInfo}`}</p>
            <p>{`Inventory Info : ${retailer.inventoryInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetRetailer;
