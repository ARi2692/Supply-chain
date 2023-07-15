import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";


const GetQualityAssurance = ({ productID }) => {
  const { chain } = useNetwork();
  //   const [qualityAssuranceDetails, setQualityAssuranceDetails] = useState([]);
  const [qualityAssurance, setQualityAssurance] = useState({});
  const [qualityAssuranceFound, setQualityAssuranceFound] = useState(false);

  useEffect(() => {
    getAllQualityAssurances();
  }, [productID]);

  const getAllQualityAssurances = async () => {
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

    const tx = await contract.getQualityAssurance(productID - 1);
    setQualityAssurance(tx);
    setQualityAssuranceFound(true);
  };

  return (
    <div>
      <div>
        {qualityAssuranceFound && (
          <>
            <p>{`Quality Assurance ID : ${qualityAssurance.assuranceID}`}</p>
            <p>{`Quality Standards Meet : ${qualityAssurance.qualityStandardsMeet}`}</p>
            <p>{`QualityAssurance idealTemperature : ${qualityAssurance.idealTemperature}`}</p>
            <p>{`Guidelines Meet : ${qualityAssurance.guidelinesMeet}`}</p>
            <p>{`Compliant : ${qualityAssurance.compliant}`}</p>
            <p>{`Audited : ${qualityAssurance.audited}`}</p>
            <p>{`verified : ${qualityAssurance.verified}`}</p>
            <p>{`Certifying body ID : ${qualityAssurance.certifyingbodyID}`}</p>
            <p>{`Certification Info : ${qualityAssurance.certificationInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetQualityAssurance;
