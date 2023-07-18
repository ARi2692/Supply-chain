import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import moment from "moment";

const GetFarmer = ({ productID }) => {
  const { chain } = useNetwork();
  const [farmer, setFarmer] = useState({});
  const [farmerFound, setFarmerFound] = useState(false);

  useEffect(() => {
    getAllFarmers();
  }, [productID]);

  const getAllFarmers = async () => {
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

    const tx = await contract.getFarmer(productID - 1);
    setFarmer(tx);
    setFarmerFound(true);
  };

  return (
    <div>
      <div>
        {farmerFound && (
          <>
            <p>{`Farmer ID : ${farmer.farmerID}`}</p>
            <p>{`Delivered Date : ${
              farmer.dateTimeDelivered > 0
                ? moment(farmer.dateTimeDelivered).format("MM/DD/YYYY")
                : 0
            }`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetFarmer;
