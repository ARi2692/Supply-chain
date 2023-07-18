import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import moment from "moment";

const GetDistributor = ({ productID }) => {
  const { chain } = useNetwork();
  const [distributor, setDistributor] = useState({});
  const [distributorFound, setDistributorFound] = useState(false);

  useEffect(() => {
    getAllDistributors();
  }, [productID]);

  const getAllDistributors = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].supplyChainAddress,
      SupplyChain.abi,
      signer
    );

    console.log("Form submitted with supplier:", productID);

    const tx = await contract.getDistributor(productID - 1);
    setDistributor(tx);
    setDistributorFound(true);
  };

  return (
    <div>
      <div>
        {distributorFound && (
          <>
            <p>{`Distributor ID : ${distributor.distributorID}`}</p>
            <p>{`Temperature : ${distributor.temperature}`}</p>
            <p>{`OrdersReceived : ${distributor.ordersReceived}`}</p>
            <p>{`Volume : ${distributor.volume}`}</p>
            <p>{`Date Time Received : ${
              distributor.dateTimeReceived > 0
                ? moment(distributor.dateTimeReceived).format("MM/DD/YYYY")
                : 0
            }`}</p>
            <p>{`Warehouse Facilities : ${distributor.warehouseFacilities}`}</p>
            <p>{`Product Handling Info : ${distributor.productHandlingInfo}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetDistributor;
