import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const GetSupplier = ({ productID }) => {
  const { chain } = useNetwork();
  const [supplier, setSupplier] = useState({});
  const [supplierFound, setSupplierFound] = useState(false);

  useEffect(() => {
    getAllSuppliers();
  }, [productID]);

  const getAllSuppliers = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.getSupplier(productID - 1);
    setSupplier(tx);
    setSupplierFound(true);
  };

  return (
    <div>
      <div>
        {supplierFound && (
          <>
            <p>{`Supplier ID : ${supplier.supplierID}`}</p>
            <p>{`Date delivered : ${supplier.dateTimeDelivered}`}</p>
            <p>{`Specifications And Processing Info : ${
              supplier.specificationsAndProcessingInfo > 0
                ? moment(supplier.specificationsAndProcessingInfo).format(
                    "MM/DD/YYYY"
                  )
                : 0
            }`}</p>
            <p>{`Temperature : ${supplier.temperature}`}</p>
            <p>{`Safe Above Age : ${supplier.safeAboveAge}`}</p>
            <p>{`Organic : ${supplier.isOrganic}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetSupplier;
