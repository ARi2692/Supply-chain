import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import moment from "moment";

const GetLogistics = ({ productID }) => {
  const { chain } = useNetwork();
  const [logistics, setLogistics] = useState({});
  const [logisticsFound, setLogisticsFound] = useState(false);

  useEffect(() => {
    getAllLogisticsDetails();
  }, [productID]);

  const getAllLogisticsDetails = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    const tx = await contract.getLogistics(productID - 1);
    setLogistics(tx);
    setLogisticsFound(true);
  };

  return (
    <div>
      <div>
        {logisticsFound && (
          <>
            <p>{`Logistics ID : ${logistics.logisticsID}`}</p>
            <p>{`Temperature : ${logistics.temperature}`}</p>
            <p>{`Volume : ${logistics.volume}`}</p>
            <p>{`Mode Of Transport : ${logistics.modeOfTransport}`}</p>
            <p>{`Date Time Started Delivering : ${
              logistics.dateTimeStartedDelivering > 0
                ? moment(logistics.dateTimeStartedDelivering).format(
                    "MM/DD/YYYY"
                  )
                : 0
            }`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetLogistics;
