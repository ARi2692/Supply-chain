import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./distributionCentre.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import toast from "react-hot-toast";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";

// const Select = styled.select`
//   color: #333; /* Secondary color */
//   font-size: 1.5rem; /* Large size */
//   padding: 8px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
//   background-color: #fff;
// `;

const Input = styled.input`
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// const SelectOneItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 200px;
//   height: 100px;
//   background-color: ${(props) => (props.selected ? "#808080" : "#e0e0e0")};
//   border-radius: 4px;
//   margin: 10px;
//   cursor: pointer;

//   &:hover {
//     background-color: #c0c0c0;
//   }

//   &:active {
//     background-color: #808080;
//   }
// `;

const SubmitButton = styled.button`
  background-color: #808080;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// const SubmitButtonDisabled = styled.button`
//   background-color: #808080;
//   color: #ffffff;
//   padding: 10px 20px;
//   font-size: 1.5rem;
//   border: none;
//   border-radius: 4px;
//   cursor: not-allowed;
//   opacity: 0.5;
// `;

const SubmitButtonBack = styled.button`
  background-color: #E8E8E8;
  color: #696969;
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const DistributionCentre = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [token, setToken] = useState("");
  const [distributionCentreTime, setDistributionCentreTime] = useState(0);
  const [distributionCentreAmount, setDistributionCentreAmount] = useState(0);
  const [interestIndex, setInterestIndex] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [formInput, updateFormInput] = useState({
    distributionCentreID: 0,
    productName: "",
    origin: "",
    batchNo: 0,
    expiryDate: 0,
    totalVolume: 0,
    temperatureLimit: 0,
    instructions:""
  });

  // const handleChange = (event) => {
  //   if (event.target.value === "GLD") {
  //     console.log("in token");
  //     setToken("0xe028608d419e628b64b39283115665aAe5BaEb71");
  //   } else {
  //     setToken("0xf7201c9505Af8307587eDDe8a864387D8e5f96Ab");
  //   }
  // };


  const formatBigNumber = (bn) => {
    const divideBy = new BigNumber("10").pow(new BigNumber(18));
    const converted = new BigNumber(bn.toString());
    const divided = converted.div(divideBy);
    return divided.toFixed(0, BigNumber.ROUND_DOWN);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.distributionCentreID || 
        !formInput?.productName || 
        !formInput?.origin || 
        !formInput?.batchNo ||
        !formInput?.expiryDate || 
        !formInput?.totalVolume || 
        !formInput?.temperatureLimit || 
        !formInput?.instructions
      ) {
      toast.fail("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with distributionCentre:",
      formInput?.distributionCentreID, formInput?.productName, formInput?.origin, formInput?.batchNo,
      formInput?.expiryDate, formInput?.totalVolume, formInput?.temperatureLimit,
      formInput?.instructions);

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.distributionCentreDetails(
      formInput?.distributionCentreID, formInput?.productName, formInput?.origin, formInput?.batchNo,
      formInput?.expiryDate, formInput?.totalVolume, formInput?.temperatureLimit,
      formInput?.instructions
    );

    // transaction for contract
    toast.success("Creating block... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success("DistributionCentre details logged Successfully !!");
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Details by DistributionCentre</h1>
      </div>

      <div className="distributionCentre-ID-container">
        <h3> distributionCentre ID </h3>
        <Input
          type="number"
          id="ID"
          value={formInput.distributionCentreID}
          onChange={(e) =>
          updateFormInput((formInput) => ({
            ...formInput,
            distributionCentreID: e.target.value,
          }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Product Name </h3>
        <Input
          type="text"
          id="name"
          value={formInput.productName}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              productName: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Origin </h3>
        <Input
          type="text"
          id="origin"
          value={formInput.origin}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              origin: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> batch Number </h3>
        <Input
          type="number"
          id="batchNo"
          value={formInput.batchNo}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              batchNo: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Expiry Date </h3>
        <Input
          type="number"
          id="_expiryDate"
          value={formInput.expiryDate}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              expiryDate: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Total Volume </h3>
        <Input
          type="number"
          id="totalVolume"
          value={formInput.totalVolume}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              totalVolume: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Temperature Limit </h3>
        <Input
          type="number"
          id="temperatureLimit"
          value={formInput.temperatureLimit}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              temperatureLimit: e.target.value,
            }))}
          required
        />
      </div>

      <div className="distributionCentre-ID-container">
        <h3> Instructions </h3>
        <Input
          type="text"
          id="instructions"
          value={formInput.instructions}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              instructions: e.target.value,
            }))}
          required
        />
      </div>

      <div className="submit-buttons">
      <div>
        <Link to="/">
          <SubmitButtonBack type="submit">Back</SubmitButtonBack>
        </Link>
      </div>

      <div>
        <div className="distributionCentre-submit">
          <div onClick={handleSubmit}>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </div>
      </div>

      </div>

    </div>
  );
};

export default DistributionCentre;
