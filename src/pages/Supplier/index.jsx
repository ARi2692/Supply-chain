import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./supplier.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../components/getProduct";
import moment from 'moment';

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

const Supplier = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    supplierID: 0,
    productID: 0,
    temperature: 0,
    specificationsAndProcessingInfo: "",
    safeAboveAge: 0,
    batchNo: 0,
    expiryDate: 0,
    isOrganic: false
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
      !formInput?.supplierID ||
      !formInput?.productID ||
      !formInput?.temperature ||
      !formInput?.specificationsAndProcessingInfo ||
      !formInput?.safeAboveAge ||
      !formInput?.batchNo ||
      !formInput?.expiryDate
    ) {
      toast("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with supplier:",
      formInput?.supplierID,
      formInput?.productID,
      formInput?.temperature,
      formInput?.specificationsAndProcessingInfo,
      formInput?.safeAboveAge,
      formInput?.batchNo,
      formInput?.expiryDate,
      formInput?.isOrganic
    );

    var unixTimestamp = moment(formInput?.expiryDate).unix();
    // console.log(unixTimestamp)
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.processorAndsupplierDetails(
      formInput?.supplierID,
      formInput?.productID - 1,
      formInput?.temperature,
      formInput?.specificationsAndProcessingInfo,
      formInput?.safeAboveAge,
      formInput?.batchNo,
      unixTimestamp,
      formInput?.isOrganic
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    console.log("logged !");
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      navigate("/");
      toast("Supplier details logged Successfully !!");
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Supplier</h1>
      </div>

      <div className="supplier-ID-container">
        <h3> product ID </h3>
        <Input
          type="number"
          id="productID"
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

          <div className="supplier-ID-container">
            <h3> supplier ID </h3>
            <Input
              type="number"
              id="ID"
              value={formInput.supplierID}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  supplierID: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="supplier-ID-container">
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

          <div className="supplier-ID-container">
            <h3> specifications And Processing Info </h3>
            <Input
              type="text"
              id="specificationsAndProcessingInfo"
              value={formInput.specificationsAndProcessingInfo}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  specificationsAndProcessingInfo: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="supplier-ID-container">
            <h3> Safe Above Age </h3>
            <Input
              type="number"
              id="safeAboveAge"
              value={formInput.safeAboveAge}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  safeAboveAge: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="supplier-ID-container">
            <h3> batch Number </h3>
            <Input
              type="number"
              id="batchNo"
              value={formInput.batchNo}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  batchNo: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="supplier-ID-container">
            <h3> Expiry Date </h3>
            <Input
              type="date"
              id="expiryDate"
              value={formInput.expiryDate}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  expiryDate: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="supplier-ID-container">
            <h3> Is it Organic? </h3>
            <Input
              type="checkbox"
              id="isOrganic"
              value={formInput.isOrganic}
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  isOrganic: e.target.value,
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
            <div className="supplier-submit">
              <div onClick={handleCheck}>
                <SubmitButton type="submit">Check</SubmitButton>
              </div>
            </div>
          </div>
        )}

        {productFound && (
          <div>
            <div className="supplier-submit">
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

export default Supplier;
