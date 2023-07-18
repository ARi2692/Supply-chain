import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./farmer.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";
// import {ReactTooltip} from 'react-tooltip';

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

const Farmer = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [formInput, updateFormInput] = useState({
    farmerID: 0,
    productName: "",
    origin: "",
    harvestDate: 0,
    totalVolume: 0,
    temperatureLimit: 0,
    envInfo: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (
      !formInput?.farmerID ||
      !formInput?.productName ||
      !formInput?.origin ||
      !formInput?.harvestDate ||
      !formInput?.totalVolume ||
      !formInput?.temperatureLimit ||
      !formInput?.envInfo
    ) {
      toast("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with farmer:",
      formInput?.farmerID,
      formInput?.productName,
      formInput?.origin,
      formInput?.harvestDate,
      formInput?.totalVolume,
      formInput?.temperatureLimit,
      formInput?.envInfo
    );

    var unixTimestamp = moment(formInput?.harvestDate, "YYYY.MM.DD").unix();

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.farmerDetails(
      formInput?.farmerID,
      formInput?.productName,
      formInput?.origin,
      unixTimestamp,
      formInput?.totalVolume,
      formInput?.temperatureLimit,
      formInput?.envInfo
    );

    // transaction for contract
    toast("Creating block... Please Wait", { icon: "👏" });
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      toast("Farmer details logged Successfully !!");
      navigate("/");
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <h1>Details by Farmer</h1>
      </div>

      <div className="farmer-ID-container">
        <h3> farmer ID </h3>
        <Input
          type="number"
          id="ID"
          value={formInput.farmerID}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              farmerID: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="farmer-ID-container">
        <h3> Product Name </h3>
        <Input
          type="text"
          id="name"
          value={formInput.productName}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              productName: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="farmer-ID-container">
        <h3> Location </h3>
        <Input
          type="text"
          id="origin"
          value={formInput.origin}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              origin: e.target.value,
            }))
          }
          required
        />
      </div>

      {/* <div className="farmer-ID-container">
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
      </div> */}

      <div className="farmer-ID-container">
        <h3> Harvest Date </h3>
        <Input
          type="date"
          id="harvestDate"
          value={formInput.harvestDate}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              harvestDate: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="farmer-ID-container">
        <h3> Total Volume </h3>
        <Input
          type="number"
          id="totalVolume"
          value={formInput.totalVolume}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              totalVolume: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="farmer-ID-container">
        <h3> Temperature Limit </h3>
        <Input
          type="number"
          id="temperatureLimit"
          value={formInput.temperatureLimit}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              temperatureLimit: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="farmer-ID-container">
        <h3> Environmental information </h3>
        <Input
          type="text"
          id="envInfo"
          value={formInput.envInfo}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              envInfo: e.target.value,
            }))
          }
          required
        />
        <span title="the farming process, such as soil composition, weather conditions, water sources, or usage of fertilizers and pesticides.">
        <BsInfoCircle />
      </span>
        {/* <ReactTooltip /> */}
      </div>

      <div className="submit-buttons">
        <div>
          <Link to="/">
            <SubmitButtonBack type="submit">Back</SubmitButtonBack>
          </Link>
        </div>

        <div>
          <div className="farmer-submit">
            <div onClick={handleSubmit}>
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
