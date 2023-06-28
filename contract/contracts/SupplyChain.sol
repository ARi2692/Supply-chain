// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Supply chain
 * @dev Supply chain system aims to monitor and trace food products
 */
contract SupplyChain {

    struct Manufacturer{
        uint256 temperature;
    }

    // for range of temperature to be maintained
    uint256 temperatureLowerLimit;
    uint256 temperatureUpperLimit;

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function dairyManufacturerDetails(uint num) public pure returns(uint) {
        //  
    }

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function distributionCompanyDetails(uint num) public pure returns(uint) {
        // 
    }

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function distributionCentreDetails(uint num) public pure returns(uint) {
        // 
    }

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function deliveryTruckDetails(uint num) public pure returns(uint) {
        // 
    }

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function retailerDetails(uint num) public pure returns(uint) {
        // 
    }

    /**
     * @dev Store value in variable
     * @param num which 
     */
    function consumerDetails(uint num) public pure returns(uint) {
        // 
    }

}