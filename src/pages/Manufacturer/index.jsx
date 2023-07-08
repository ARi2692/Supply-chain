import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./manufacturer.css";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { getConfigByChain } from "../../config";
import SupplyChain from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import toast from "react-hot-toast";
import BigNumber from "bignumber.js";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../components/getProduct"

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

const Manufacturer = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  // const [product, setProduct] = useState({});
  const [productFound, setProductFound] = useState(false);
  const [formInput, updateFormInput] = useState({
    manufacturerID: 0,
    productID: 0,
    temperature: 0
  });

  // useEffect(() => {
  //   console.log(product);
  // })


  const formatBigNumber = (bn) => {
    const divideBy = new BigNumber("10").pow(new BigNumber(18));
    const converted = new BigNumber(bn.toString());
    const divided = converted.div(divideBy);
    return divided.toFixed(0, BigNumber.ROUND_DOWN);
  };

  const handleCheck = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.productID) {
      toast.error("Please fill all the fields!");
      return;
    }
    console.log("Form submitted with manufacturer:", formInput?.productID);
    setProductFound(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    if (!formInput?.manufacturerID || 
        !formInput?.productID || 
        !formInput?.temperature
      ) {
      toast.error("Please fill all the fields!");
      return;
    }
    console.log(
      "Form submitted with manufacturer:",
      formInput?.manufacturerID, formInput?.productID, formInput?.temperature);

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.manufacturerDetails(
      formInput?.manufacturerID, formInput?.productID, formInput?.temperature
    );

    // transaction for contract
    toast.success("Creating block... Please Wait", { icon: "👏" });
    console.log("logged !")
    await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        navigate("/");
        toast.success("Manufacturer details logged Successfully !!");
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Details by Manufacturer</h1>
      </div>

      <div className="manufacturer-ID-container">
        <h3> product ID </h3>
        <Input
          type="number"
          id="productID"
          value={formInput.productID}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              productID: e.target.value,
            }))}
          required
        />
      </div>
      

      {productFound && 
      <>

      < Product productID={formInput.productID} />

      <div className="manufacturer-ID-container">
        <h3> manufacturer ID </h3>
        <Input
          type="number"
          id="ID"
          value={formInput.manufacturerID}
          onChange={(e) =>
          updateFormInput((formInput) => ({
            ...formInput,
            manufacturerID: e.target.value,
          }))}
          required
        />
      </div>

      <div className="manufacturer-ID-container">
        <h3> Temperature </h3>
        <Input
          type="number"
          id="temperature"
          value={formInput.temperature}
          onChange={(e) =>
            updateFormInput((formInput) => ({
              ...formInput,
              temperature: e.target.value,
            }))}
          required
        />
      </div>
      </>
      }


      <div className="submit-buttons">
      <div>
        <Link to="/">
          <SubmitButtonBack type="submit">Back</SubmitButtonBack>
        </Link>
      </div>

      {!productFound && 
      <div>
      <div className="manufacturer-submit">
        <div onClick={handleCheck}>
          <SubmitButton type="submit">Check</SubmitButton>
        </div>
      </div>
      </div>
      }

      {productFound && 
      <div>
        <div className="manufacturer-submit">
          <div onClick={handleSubmit}>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </div>
      </div>
      }

      </div>

    </div>
  );
};

export default Manufacturer;
