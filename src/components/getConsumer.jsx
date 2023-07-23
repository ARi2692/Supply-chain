import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const GetConsumer = ({ productID, consumerID }) => {
  const { chain } = useNetwork();
  const [consumer, setConsumer] = useState({});
  const [consumerFound, setConsumerFound] = useState(false);

  useEffect(() => {
    getAllConsumers();
  }, [productID]);

  const getAllConsumers = async () => {
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

    const tx = await contract.getConsumer(productID - 1, consumerID);
    setConsumer(tx);
    setConsumerFound(true);
  };

  return (
    <div>
      <div>

        {consumerFound && (
          <>
            <p>{`Units Bought by the consumer : ${consumer.unitsBought}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetConsumer;
