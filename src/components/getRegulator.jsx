import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import Icon from "./getIcon";

const GetRegulator = ({ productID }) => {
  const { chain } = useNetwork();
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

    console.log("Form submitted with supplier:", productID);

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
            <p>
              Permit Requirements Fulfilled :{" "}
              <Icon value={regulator.permitRequirementsFulfilled} />
            </p>
            <p>
              Sanctions Imposed : <Icon value={regulator.sanctionsImposed} />
            </p>
            <p>{`Analysis Info : ${regulator.analysisInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetRegulator;
