import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./logistics.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BigNumber from "bignumber.js";
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

const Logistics = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    logisticsID: 0,
    productID: 0,
    temperature: 0,
    modeOfTransport: 0,
    volume: 0,
  });

  const handleCheck = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.productID) {
      toast("Please fill all the fields!");
      return;
    }
    console.log("Form submitted with supplier:", formInput?.productID);
    setProductFound(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (
      !formInput?.logisticsID ||
      !formInput?.productID ||
      !formInput?.temperature ||
      !formInput?.modeOfTransport ||
      !formInput?.volume
    ) {
      toast("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with logistics:",
      formInput?.logisticsID,
      formInput?.productID,
      formInput?.temperature,
      formInput?.modeOfTransport,
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

    const tx = await contract.logisticsDetails(
      formInput?.logisticsID,
      formInput?.productID - 1,
      formInput?.temperature,
      formInput?.modeOfTransport,
      formInput?.volume
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        navigate("/");
        toast("Logistics details logged Successfully !!");
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Logistics</h1>
      </div>

      <div className="logistics-ID-container">
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
          <div className="logistics-ID-container">
            <h3> logistics ID </h3>
            <Input
              type="number"
              id="logisticsID"
              value={formInput.logisticsID}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  logisticsID: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="logistics-ID-container">
            <h3> volume </h3>
            <Input
              type="number"
              id="volume"
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

          <div className="logistics-ID-container">
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

          <div className="logistics-ID-container">
            <h3> Mode Of Transport </h3>
            <Input
              type="number"
              id="modeOfTransport"
              value={formInput.modeOfTransport}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  modeOfTransport: e.target.value,
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
            <div className="logistics-submit">
              <div onClick={handleCheck}>
                <SubmitButton type="submit">Check</SubmitButton>
              </div>
            </div>
          </div>
        )}

        {productFound && (
          <div>
            <div className="logistics-submit">
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

export default Logistics;
