// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Supply chain
 * @dev Supply chain system aims to monitor and trace food products
 */
contract Storage {

    struct product {
        uint256 productID;
        string productName;
        bool safetyCheck; 
        string origin;
        uint256 batchNo;
        uint256 expiryDate;
        uint256 totalVolume;
        uint256 temperatureLowerLimit; // for range of temperature to be maintained
        uint256 temperatureUpperLimit;
        string instructions; // message instructions storagecond
    }

    struct farmer {
        uint256 farmerID;
        uint256 productIndex;
        uint256 dateTimeDelivered;
    }

    // to distribution after processing
    struct Manufacturer{
        uint256 manufacturerID;
        uint256 productIndex;
        uint256 dateTimeDelivered;
        uint256 temperature;
    }

    struct processor {
        uint256 productIndex;
        bool qualityCheck;
        bool saferToConsume;
        uint256 safeAboveAge;
    }

    struct distributionCompany {
        uint256 distrubutorCompanyID;
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct distributionCentre {
        uint256 distrubutorCentreID;
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct deliveryTruck {
        uint256 deliveryTruckID;
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeStartedDelivering;
    }

    struct retailer {
        uint256 retailerID;
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct consumer {
        uint256 productIndex;
        uint256 temperature;
        uint256 unitsReceived;
        uint256 dateTimeReceived;
    }

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