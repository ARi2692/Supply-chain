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
        // uint256 productID;
        string productName;
        string origin;
        uint256 batchNo;
        uint256 expiryDate;
        uint256 totalVolume;
        uint256 idealTemperature; // for range of temperature to be maintained
        // uint256 temperatureUpperLimit;
        string instructions; // message instructions storagecond
    }

    struct Farmer {
        uint256 farmerID;
        // uint256 productIndex;
        uint256 dateTimeDelivered;
    }

    struct Manufacturer {
        uint256 manufacturerID;
        // uint256 productIndex;
        uint256 dateTimeDelivered; // to distribution after processing
        uint256 temperature;
    }

    struct Processor {
        bool qualityCheck;
        bool saferToConsume;
        uint256 safeAboveAge;
    }

    struct DistributionCompany {
        uint256 distrubutorCompanyID;
        // uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 volume;
        uint256 dateTimeReceived;
    }

    struct DistributionCentre {
        uint256 distrubutorCentreID;
        // uint256 productIndex;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 volume;
        uint256 dateTimeReceived;
    }

    struct DeliveryTruck {
        uint256 deliveryTruckID;
        // uint256 productIndex;
        uint256 temperature;
        uint256 volume;
        uint256 dateTimeStartedDelivering;
    }

    struct Retailer {
        uint256 retailerID;
        // uint256 productIndex;
        uint256 temperature;
        uint256 volume;
        uint256 dateTimeReceived;
    }

    // check will be made regarding dateTimeReceived, temperature, standards and all
    struct Consumer {
        uint256 unitsReceivedWithinStd;
        uint256 unitsReceivedOutsideStd;
    }

    // array of products
    Product[] private products;

    // productIndex mapped to farmer
    mapping(uint256 => Farmer) private farmers;

    // productIndex mapped to Manufacturer
    mapping(uint256 => Manufacturer) private manufacturers;

    // productIndex mapped to
    mapping(uint256 => Processor) private processors;

    // productIndex to DistributionCompany
    mapping(uint256 => DistributionCompany) private distributionCompanies;

    // productIndex to DistributionCentre
    mapping(uint256 => DistributionCentre) private distributionCentres;

    // productIndex to DeliveryTruck
    mapping(uint256 => DeliveryTruck) private deliveryTrucks;

    // productIndex to Retailer
    mapping(uint256 => Retailer) private retailers;

    // productIndex to consumer
    mapping(uint256 => Consumer) private customers;

    /**
     * @notice farmer inputs the details when deliveried to the manufacturer Company
     * @dev farmer inputs details and adds the product details
     * @param _farmerID - farmer ID
     * @param _productName - the product name
     * @param _origin - the origin place of the product
     * @param _batchNo - batch number
     * @param _expiryDate - expiry date of the product
     * @param _totalVolume - total volume deliveried to the manufacturer
     * @param _temperatureLimit - the temperature limit below which the product should be kept
     * @param _instructions - any additional instructions provided by the farmer
     */
    function farmerDetails(
        uint256 _farmerID,
        string calldata _productName,
        string calldata _origin,
        uint256 _batchNo,
        uint256 _expiryDate,
        uint256 _totalVolume,
        uint256 _temperatureLimit,
        string calldata _instructions
    ) external {
        require(_farmerID > 0, "Invalid farmer ID");
        products.push(
            Product({
                productName: _productName,
                origin: _origin,
                batchNo: _batchNo,
                expiryDate: _expiryDate,
                totalVolume: _totalVolume,
                idealTemperature: _temperatureLimit,
                instructions: _instructions
            })
        );
        farmers[products.length - 1] = Farmer({
            farmerID: _farmerID,
            dateTimeDelivered: block.timestamp
        });
    }

    /**
     * @notice processor inputs the details when deliveried to the manufacturer Company
     * @dev processor inputs details before manufacturer
     * @param _productID - product ID
     * @param _qualityCheck - true if the quality check is passed and cleared
     * @param _saferToConsume - true if certified as safer to consume
     * @param _safeAboveAge - the age above which it is safe to consume
     */
    function processorDetails(
        uint256 _productID,
        bool _qualityCheck,
        bool _saferToConsume,
        uint256 _safeAboveAge
    ) external {
        require(products.length>_productID, "Product doesnot exist");
        processors[_productID] = Processor({
            qualityCheck: _qualityCheck,
            saferToConsume: _saferToConsume,
            safeAboveAge: _safeAboveAge
        });
    }

    /**
     * @notice manufacturer inputs the details when deliveried to the Distribution Company
     * @dev manufacturer inputs details after processor inputs
     * @param _manufacturerID - Manufacturer ID
     * @param _productID - the product ID 
     * @param _temperature - the temperature at the time of delivery
     */
    function manufacturerDetails(
        uint256 _manufacturerID,
        uint256 _productID,
        uint256 _temperature
    ) external  {
        require(products.length>_productID, "Product doesnot exist");
        manufacturers[_productID] = Manufacturer({
            manufacturerID: _manufacturerID,
            dateTimeDelivered: block.timestamp,
            temperature: _temperature
        });
    }

    /**
     * @notice distribution Company inputs the details
     * @dev distributor inputs details when it received
     * @param _distrubutorCompanyID - distrubutor Company ID
     * @param _productID - the product ID 
     * @param _temperature - the temperature at the time of delivery
     * @param _ordersReceived - number of orders received
     * @param _volume - the volume it received
     */
    function distributionCompanyDetails(
        uint256 _distrubutorCompanyID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _ordersReceived,
        uint256 _volume
    ) external  {
        require(products.length>_productID, "Product doesnot exist");
        distributionCompanies[_productID] = DistributionCompany({
            distrubutorCompanyID: _distrubutorCompanyID,
            temperature: _temperature,
            ordersReceived: _ordersReceived,
            volume: _volume,
            dateTimeReceived: block.timestamp
        });
    }

    /**
     * @notice distribution Centre inputs the details
     * @dev distributor inputs details when it received
     * @param _distrubutorCentreID - distrubutor Centre ID
     * @param _productID - the product ID 
     * @param _temperature - the temperature when received
     * @param _ordersReceived - number of orders received
     * @param _volume - the volume it received
     */
    function distributionCentreDetails(
        uint256 _distrubutorCentreID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _ordersReceived,
        uint256 _volume
    ) external  {
        require(products.length>_productID, "Product doesnot exist");
        distributionCentres[_productID] = DistributionCentre({
            distrubutorCentreID: _distrubutorCentreID,
            temperature: _temperature,
            ordersReceived: _ordersReceived,
            volume: _volume,
            dateTimeReceived: block.timestamp
        });
    }

    /**
     * @notice delivery Truck inputs the details
     * @dev delivery Truck inputs details when Delivery starts
     * @param _deliveryTruckID - delivery Truck ID
     * @param _productID - the product ID 
     * @param _temperature - the temperature when started with delivery
     * @param _volume - the volume it received
     */
    function deliveryTruckDetails(
        uint256 _deliveryTruckID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _volume
    ) external  {
        require(products.length>_productID, "Product doesnot exist");
        deliveryTrucks[_productID] = DeliveryTruck({
            deliveryTruckID: _deliveryTruckID,
            temperature: _temperature,
            volume: _volume,
            dateTimeStartedDelivering: block.timestamp
        });
    }

    /**
     * @notice retailer inputs the details
     * @dev retailer inputs details when received
     * @param _retailerID - Retailer ID
     * @param _productID - the product ID 
     * @param _temperature - the temperature when received
     * @param _volume - the volume it received
     */
    function retailerDetails(
        uint256 _retailerID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _volume
    ) external {
        require(products.length>_productID, "Product doesnot exist");
        retailers[_productID] = Retailer({
            retailerID: _retailerID,
            temperature: _temperature,
            volume: _volume,
            dateTimeReceived: block.timestamp
        });
    }

    /**
     * @notice consumer inputs the details
     * @dev consumer inputs details when received
     * @param _productID - the product ID 
     * @param _unitsReceived - units it received
     * @param _temperature - the temperature when received
     * @param _satisfied - true if satisfied with the product 
     */
    function consumerDetails(uint256 _productID, uint256 _unitsReceived, uint256 _temperature, bool _satisfied) external {
        require(products.length>_productID, "Product doesnot exist");
        // or can be used as bool satsfied with the product condition 
        if (_temperature < products[_productID].idealTemperature && products[_productID].expiryDate > block.timestamp && _satisfied ) {
            customers[_productID].unitsReceivedWithinStd += _unitsReceived;
        } else {
            customers[_productID].unitsReceivedOutsideStd += _unitsReceived;
        }
    }

    function getProduct(uint256 _productID) external view returns(Product memory productDetails) {
        require(products.length>_productID, "Product doesnot exist");
        productDetails = products[_productID];
    }
}