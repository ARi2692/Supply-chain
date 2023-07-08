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
  background-color: #e8e8e8;
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
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    distributionCentreID: 0,
    productID: 0,
    temperature: 0,
    ordersReceived: 0,
    volume: 0,
  });

  // const formatBigNumber = (bn) => {
  //   const divideBy = new BigNumber("10").pow(new BigNumber(18));
  //   const converted = new BigNumber(bn.toString());
  //   const divided = converted.div(divideBy);
  //   return divided.toFixed(0, BigNumber.ROUND_DOWN);
  // };

  const handleCheck = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.productID) {
      toast.fail("Please fill all the fields!");
      return;
    }
    console.log("Form submitted with manufacturer:", formInput?.productID);
    setProductFound(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (
      !formInput?.distributionCentreID ||
      !formInput?.productID ||
      !formInput?.temperature ||
      !formInput?.ordersReceived ||
      !formInput?.volume
    ) {
      toast.fail("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with distributionCentre:",
      formInput?.distributionCentreID,
      formInput?.productID,
      formInput?.temperature,
      formInput?.ordersReceived,
      formInput?.volume
    );

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
      formInput?.distributionCentreID,
      formInput?.productID,
      formInput?.temperature,
      formInput?.ordersReceived,
      formInput?.volume
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

      <div className="distributionCompany-ID-container">
        <h3> Product ID </h3>
        <Input
          type="number"
          id="name"
          value={formInput.productID}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              productID: e.target.value,
            }))
          }
          required
        />
      </div>

      {productFound && (
        <>
          <Product productID={formInput.productID} />
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
                }))
              }
              required
            />
          </div>

          <div className="distributionCompany-ID-container">
            <h3> orders Received </h3>
            <Input
              type="number"
              id="origin"
              value={formInput.ordersReceived}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  ordersReceived: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="distributionCompany-ID-container">
            <h3> volume </h3>
            <Input
              type="number"
              id="batchNo"
              value={formInput.volume}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  volume: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="distributionCompany-ID-container">
            <h3> Temperature </h3>
            <Input
              type="number"
              id="temperatureLimit"
              value={formInput.temperature}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  temperature: e.target.value,
                }))
              }
              required
            />
          </div>
        </>
      )}

      <div className="submit-buttons">
        <div>
          <Link to="/">
            <SubmitButtonBack type="submit">Back</SubmitButtonBack>
          </Link>
        </div>

        {!productFound && (
          <div>
            <div className="processor-submit">
              <div onClick={handleCheck}>
                <SubmitButton type="submit">Check</SubmitButton>
              </div>
            </div>
          </div>
        )}

        {productFound && (
          <div>
            <div className="distributionCentre-submit">
              <div onClick={handleSubmit}>
                <SubmitButton type="submit">Submit</SubmitButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionCentre;
