// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Supply chain
 * @author Arundhati
 * @notice You can use this contract for tracking the product from farmer to the consumer
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
        uint256 productIndex;
        uint256 dateTimeDelivered;
    }

    struct Manufacturer {
        uint256 productIndex;
        uint256 dateTimeDelivered; // to distribution after processing
        uint256 temperature;
    }

    struct Processor {
        bool qualityCheck;
        bool saferToConsume;
        uint256 safeAboveAge;
    }

    struct DistributionCompany {
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct DistributionCentre {
        uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    struct DeliveryTruck {
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeStartedDelivering;
    }

    struct Retailer {
        uint256 productIndex;
        uint256 temperature;
        uint256 Volume;
        uint256 dateTimeReceived;
    }

    // check will be made regarding dateTimeReceived, temperature, standards and all
    struct Consumer {
        uint256 unitsReceivedWithinStd;
        uint256 receivedWithinStd;
        uint256 unitsReceivedOutsideStd;
        uint256 receivedOutsideStd;
    }

    // array of products 
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
     * @notice farmer inputs the details when deliveried to the manufacturer Company
     * @dev farmer inputs details and adds the product details
     */
    function farmerDetails() external pure {
        //
    }

    /**
     * @notice processor inputs the details when deliveried to the manufacturer Company
     * @dev processor inputs details before manufacturer
     */
    function processorDetails() external pure {
        //
    }

    /**
     * @notice manufacturer inputs the details when deliveried to the Distribution Company
     * @dev manufacturer inputs details after processor inputs
     */
    function manufacturerDetails() external pure {
        //
    }


    /**
     * @notice distribution Company inputs the details 
     * @dev distributor inputs details when it received
     */
    function distributionCompanyDetails() external pure  {
        //
    }

    /**
     * @notice distribution Centre inputs the details 
     * @dev distributor inputs details when it received
     */
    function distributionCentreDetails() external pure {
        //
    }

    /**
     * @notice delivery Truck inputs the details 
     * @dev delivery Truck inputs details when Delivery starts
     */
    function deliveryTruckDetails() external pure {
        //
    }

    /**
     * @notice retailer inputs the details 
     * @dev retailer inputs details when received
     */
    function retailerDetails() public pure  {
        //
    }

    /**
     * @notice consumer inputs the details 
     * @dev consumer inputs details when received
     */
    function consumerDetails() public pure {
        //
    }

}