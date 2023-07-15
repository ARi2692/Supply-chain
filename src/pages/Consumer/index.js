import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./consumer.css";
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

const Consumer = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    productID: 0,
    unitsReceived: 0,
    temperature: 0,
    satisfied: false,
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
      !formInput?.productID ||
      !formInput?.unitsReceived ||
      !formInput?.temperature
    ) {
      console.log("arree");
      toast("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with consumer:",
      formInput?.productID,
      formInput?.unitsReceived,
      formInput?.temperature,
      formInput?.satisfied
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

    const tx = await contract.consumerDetails(
      formInput?.productID,
      formInput?.unitsReceived,
      formInput?.temperature,
      formInput?.satisfied
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      navigate("/");
      toast("Consumer details logged Successfully !!");
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Consumer</h1>
      </div>

      <div className="consumer-ID-container">
        <h3> product ID </h3>
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
          <div className="consumer-ID-container">
            <h3> units Received </h3>
            <Input
              type="number"
              id="unitsReceived"
              value={formInput.unitsReceived}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  unitsReceived: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="consumer-ID-container">
            <h3> Temperature </h3>
            <Input
              type="number"
              id="temperature"
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

          <div className="consumer-ID-container">
            <h3> satisfied </h3>
            <Input
              type="checkbox"
              id="satisfied"
              value={formInput.satisfied}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  satisfied: e.target.value,
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
            <div className="consumer-submit">
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

export default Consumer;
