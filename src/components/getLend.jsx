import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { getConfigByChain } from "../config";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const StyledTBody = styled.tbody`
  td {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;


const GetLend = ({lendLength}) => {
  const { chain } = useNetwork();
  const [lendDetails, setLendDetails] = useState([]);

  useEffect(() => {
    const getAllLends = async () => {
      await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
      const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
      const signer = provider.getSigner();
      console.log(getConfigByChain(chain?.id)[0].supplyChainAddress);
      const contract = new ethers.Contract(
        getConfigByChain(chain?.id)[0].supplyChainAddress,
        SupplyChain.abi,
        signer
      );

      for (let i; i < lendLength; i++) {
        const tx = await contract.lendTokens(i);
        const interestDetails = await contract.getInterestRate(tx.interestIndex, false)
        const data = {
          token: tx.token,
          amount: tx.amount,
          lendWaitTime: tx.lendWaitTime,
          interestRate: interestDetails._interestRate,
          interestPeriod: interestDetails._repaymentInDays,
          lender: tx.lender,
          borrower: tx.borrower,
          collateralToken: tx.collateralToken,
          collateralAmount: tx.collateralAmount,
          isLocked: tx.isLocked,
          isRepaid: tx.isRepaid,
          isWithdrawn: tx.isWithdrawn,
        };
        setLendDetails((prevLendDetails) => [...prevLendDetails, data]);
      }
    };

    getAllLends()
  });

  return (
    <div>
      <StyledTBody>
        {lendDetails.map((lendDetail, index) => (
          <tr key={index}>
            <td>{lendDetail.token}</td>
            <td>{lendDetail.amount}</td>
            <td>{lendDetail.collateralToken}</td>
            <td>{lendDetail.collateralAmount}</td>
            <td>{lendDetail.interestPeriod}</td>
            <td>{lendDetail.interestRate}</td>
          </tr>
        ))}
      </StyledTBody>
    </div>
  );
};

export default GetLend;
