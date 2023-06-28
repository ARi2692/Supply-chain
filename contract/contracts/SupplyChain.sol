// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Supply chain
 * @dev Supply chain system aims to monitor and trace food products
 */
contract SupplyChain {

    struct Product {
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

    struct Farmer {
        // uint256 farmerID;
        uint256 productIndex;
        uint256 dateTimeDelivered;
    }

    // to distribution after processing
    struct Manufacturer {
        // uint256 manufacturerID;
        uint256 productIndex;
        uint256 dateTimeDelivered;
        uint256 temperature;
    }

    struct Processor {
        // uint256 productIndex;
        bool qualityCheck;
        bool saferToConsume;
        uint256 safeAboveAge;
    }

    struct DistributionCompany {
        // uint256 distrubutorCompanyID;
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct DistributionCentre {
        // uint256 distrubutorCentreID;
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct DeliveryTruck {
        // uint256 deliveryTruckID;
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeStartedDelivering;
    }

    struct Retailer {
        // uint256 retailerID;
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    // check will be made regarding dateTimeReceived, temperature, standards and all
    struct Consumer {
        // uint256 productIndex;
        // uint256 temperature;
        // uint256 dateTimeReceived;
        uint256 unitsReceivedWithinStd;
        uint256 receivedWithinStd;
        uint256 unitsReceivedOutsideStd;
        uint256 receivedOutsideStd;
    }

    Product[] private products;

    // farmerID mapped to farmer
    mapping(uint256 => Farmer) private farmers;

    // manufacturerID mapped to manufraturer
    mapping(uint256 => Manufacturer) private manufacturers;

    // productIndex mapped to
    mapping(uint256 => Processor) private processors;

    // distrubutorCompanyID to DistributionCompany
    mapping(uint256 => DistributionCompany) private distributionCompanies;

    // distrubutorCentreID to DistributionCentre
    mapping(uint256 => DistributionCentre) private distributionCentres;

    // deliveryTruckID to DeliveryTruck
    mapping(uint256 => DeliveryTruck) private deliveryTrucks;

    // retailerID to Retailer
    mapping(uint256 => Retailer) private retailers;

    // productIndex to consumer
    mapping(uint256 => Consumer) private customers;

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