import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import Icon from "./getIcon";

const GetQualityAssurance = ({ productID }) => {
  const { chain } = useNetwork();
  const [qualityAssurance, setQualityAssurance] = useState({});
  const [qualityAssuranceFound, setQualityAssuranceFound] = useState(false);

  useEffect(() => {
    getAllQualityAssurances();
  }, [productID]);

  const getAllQualityAssurances = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

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
            <p>
              Quality Standards Meet :{" "}
              <Icon value={qualityAssurance.qualityStandardsMeet} />
            </p>
            <p>
              QualityAssurance idealTemperature :{" "}
              <Icon value={qualityAssurance.idealTemperature} />
            </p>
            <p>
              Guidelines Meet : <Icon value={qualityAssurance.guidelinesMeet} />
            </p>
            <p>
              Compliant : <Icon value={qualityAssurance.compliant} />
            </p>
            <p>
              Audited : <Icon value={qualityAssurance.audited} />
            </p>
            <p>
              verified : <Icon value={qualityAssurance.verified} />
            </p>
            <p>{`Certifying body ID : ${qualityAssurance.certifyingbodyID}`}</p>
            <p>{`Certification Info : ${qualityAssurance.certificationInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetQualityAssurance;
