import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";


const GetRegulator = ({ productID }) => {
  const { chain } = useNetwork();
  //   const [regulatorDetails, setRegulatorDetails] = useState([]);
  const [regulator, setRegulator] = useState({});
  const [regulatorFound, setRegulatorFound] = useState(false);

  useEffect(() => {
    getAllRegulators();
  }, [productID]);

  const getAllRegulators = async () => {
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

    const tx = await contract.getRegulator(productID - 1);
    setRegulator(tx);
    setRegulatorFound(true);
  };

  return (
    <div>
      <div>
        {regulatorFound && (
          <>
            <p>{`Regulator ID : ${regulator.regulatorID}`}</p>
            <p>{`Permit Requirements Fulfilled : ${regulator.permitRequirementsFulfilled}`}</p>
            <p>{`Sanctions Imposed : ${regulator.sanctionsImposed}`}</p>
            <p>{`Analysis Info : ${regulator.analysisInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetRegulator;
