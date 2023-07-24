import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./qualityAssurance.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../components/getProduct";

const Input = styled.input`
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #808080;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

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

const QualityAssurance = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    productID: 0,
    assuranceID: 0,
    qualityStandardsMeet: false,
    audited: false,
    verified: false,
    guidelinesMeet: false,
    compliant: false,
    certifyingbodyID: 0,
    certificationInfo: "",
  });

  const handleCheck = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.productID) {
      toast("Please fill all the fields!");
      return;
    }
    setProductFound(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (
      !formInput?.assuranceID ||
      !formInput?.productID ||
      !formInput?.certifyingbodyID ||
      !formInput?.certificationInfo
    ) {
      toast("Please fill all the fields!");
      return;
    }

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.qualityAssuranceAnalystDetails(
      formInput?.productID - 1,
      formInput?.assuranceID,
      formInput?.qualityStandardsMeet,
      formInput?.audited,
      formInput?.verified,
      formInput?.guidelinesMeet,
      formInput?.compliant,
      formInput?.certifyingbodyID,
      formInput?.certificationInfo
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      navigate("/");
      toast("QualityAssurance details logged Successfully !!");
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by QualityAssurance</h1>
      </div>

      <div className="qualityAssurance-ID-container">
        <h3> Product ID </h3>
        <Input
          type="number"
          id="ID"
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

          <div className="qualityAssurance-ID-container">
            <h3> Quality Assurance ID </h3>
            <Input
              type="number"
              id="assuranceID"
              value={formInput.assuranceID}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  assuranceID: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Quality Standards Meet </h3>
            <Input
              type="checkbox"
              id="qualityStandardsMeet"
              value={formInput.qualityStandardsMeet}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  qualityStandardsMeet: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Audited </h3>
            <Input
              type="checkbox"
              id="audited"
              value={formInput.audited}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  audited: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Verified </h3>
            <Input
              type="checkbox"
              id="verified"
              value={formInput.verified}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  verified: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Guidelines Meet </h3>
            <Input
              type="checkbox"
              id="guidelinesMeet"
              value={formInput.guidelinesMeet}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  guidelinesMeet: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Compliant </h3>
            <Input
              type="checkbox"
              id="compliant"
              value={formInput.compliant}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  compliant: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Certifying Body ID </h3>
            <Input
              type="number"
              id="certifyingbodyID"
              value={formInput.certifyingbodyID}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  certifyingbodyID: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="qualityAssurance-ID-container">
            <h3> Certification Info </h3>
            <Input
              type="text"
              id="certificationInfo"
              value={formInput.certificationInfo}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  certificationInfo: e.target.value,
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
            <div className="qualityAssurance-submit">
              <div onClick={handleCheck}>
                <SubmitButton type="submit">Check</SubmitButton>
              </div>
            </div>
          </div>
        )}

        {productFound && (
          <div>
            <div className="qualityAssurance-submit">
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

export default QualityAssurance;
