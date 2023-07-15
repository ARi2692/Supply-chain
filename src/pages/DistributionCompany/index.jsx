import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./distributor.css";
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

const Distributor = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    distributorID: 0,
    productID: 0,
    temperature: 0,
    ordersReceived: 0,
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
      !formInput?.distributorID ||
      !formInput?.productID ||
      !formInput?.temperature ||
      !formInput?.ordersReceived ||
      !formInput?.volume
    ) {
      toast("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with distributor:",
      formInput?.distributorID,
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

    const tx = await contract.distributorDetails(
      formInput?.distributorID,
      formInput?.productID,
      formInput?.temperature,
      formInput?.ordersReceived,
      formInput?.volume
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      navigate("/");
      toast("Distributor details logged Successfully !!");
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Distributor</h1>
      </div>

      <div className="distributor-ID-container">
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
          <div className="distributor-ID-container">
            <h3> distributor ID </h3>
            <Input
              type="number"
              id="ID"
              value={formInput.distributorID}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  distributorID: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="distributor-ID-container">
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

          <div className="distributor-ID-container">
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

          <div className="distributor-ID-container">
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
            <div className="distributor-submit">
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

export default Distributor;
