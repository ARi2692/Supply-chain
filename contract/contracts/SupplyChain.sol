// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Supply chain
 * @author A
 * @notice You can use this contract for tracking the product from farmer to the consumer
 * @dev Supply chain system aims to monitor and trace food products
 */
contract SupplyChain {
    // productID is the product index
    struct Product {
        string productName;
        string origin;
        uint256 batchNo; // supplier
        uint256 harvestDate;
        uint256 expiryDate; // supplier
        uint256 totalVolume;
        uint256 idealTemperature; // for range of temperature to be maintained
        string envInfo; // message instructions storagecond
        uint256 stage;
    }

    // mapped to productID
    struct Farmer {
        uint256 farmerID;
        uint256 dateTimeDelivered;
    }

    // mapped to productID
    struct Supplier {
        uint256 supplierID;
        uint256 dateTimeDelivered; // to distribution after processing
        string specificationsAndProcessingInfo;
        // nutritional facts, ingredient lists, allergen warnings, additives, preservatives, or flavourings used
        uint256 temperature;
        uint256 safeAboveAge;
        bool isOrganic;
    }

    // mapped to productID
    struct Regulator {
        uint256 regulatorID;
        bool permitRequirementsFulfilled;
        bool sanctionsImposed;
        string analysisInfo;
    }

    // mapped to productID
    struct QualityAssurance {
        uint256 assuranceID;
        bool qualityStandardsMeet;
        bool guidelinesMeet; // regulations, guidelines, or codes of practice
        bool compliant; // routine inspections, audits, or sampling done
        bool audited;
        bool verified;
        uint256 certifyingbodyID;
        string certificationInfo;
    }

    // mapped to productID
    struct Distributor {
        uint256 distributorID;
        uint256 temperature;
        uint256 ordersReceived;
        uint256 volume;
        uint256 dateTimeReceived;
        string warehouseFacilities;
        string productHandlingInfo;
    }

    // mapped to productID
    struct Logistics {
        uint256 logisticsID;
        uint256 temperature;
        uint256 volume;
        uint256 modeOfTransport;
        uint256 dateTimeStartedDelivering;
    }

    // mapped to productID
    struct Retailer {
        uint256 retailerID;
        uint256 temperature;
        uint256 volume;
        uint256 dateTimeReceived;
        string complianceInfo;
        string promotionalInfo;
        string inventoryInfo;
    }

    // check will be made regarding dateTimeReceived, temperature, standards and all
    // mapped to productID
    struct Consumer {
        uint256 consumerID;
        uint256 unitsReceivedWithinStd;
        uint256 unitsReceivedOutsideStd;
    }

    // array of products
    Product[] private products;

    // productIndex mapped to farmer
    mapping(uint256 => Farmer) private farmers;

    // productIndex mapped to Supplier
    mapping(uint256 => Supplier) private suppliers;

    // productIndex mapped to Regulator
    mapping(uint256 => Regulator) private regulators;

    // productIndex mapped to QualityAssurance
    mapping(uint256 => QualityAssurance) private qualityAssuranceAnalysts;

    // productIndex to Distributor
    mapping(uint256 => Distributor) private distributors;

    // productIndex to Logistics
    mapping(uint256 => Logistics) private logistics;

    // productIndex to Retailer
    mapping(uint256 => Retailer) private retailers;

    // productIndex to consumer
    mapping(uint256 => Consumer) private customers;

    /**
     * @notice farmer inputs the details when deliveried to the supplier Company
     * @dev farmer inputs details and adds the product details
     * @param _farmerID - farmer ID
     * @param _productName - the product name
     * @param _origin - the origin place of the product
     * @param _harvestDate - expiry date of the product
     * @param _totalVolume - total volume deliveried to the supplier
     * @param _temperatureLimit - the temperature limit below which the product should be kept
     * @param _envInfo - any additional instructions provided by the farmer
     */
    function farmerDetails(
        uint256 _farmerID,
        string calldata _productName,
        string calldata _origin,
        uint256 _harvestDate,
        uint256 _totalVolume,
        uint256 _temperatureLimit,
        string calldata _envInfo
    ) external {
        require(_farmerID > 0, "Invalid farmer ID");
        products.push(
            Product({
                productName: _productName,
                origin: _origin,
                batchNo: 0,
                harvestDate: _harvestDate,
                expiryDate: 0, // check
                totalVolume: _totalVolume,
                idealTemperature: _temperatureLimit,
                envInfo: _envInfo,
                stage: 0
            })
        );
        farmers[products.length - 1] = Farmer({
            farmerID: _farmerID,
            dateTimeDelivered: block.timestamp
        });
    }

    /**
     * @notice supplier inputs the details when deliveried to the Distribution Company
     * @dev supplier inputs details after regulator inputs
     * @param _supplierID - Supplier ID
     * @param _productID - the product ID
     * @param _temperature - the temperature at the time of delivery
     */
    function processorAndsupplierDetails(
        uint256 _supplierID,
        uint256 _productID,
        uint256 _temperature,
        string calldata _specificationsAndProcessingInfo,
        uint256 _safeAboveAge,
        uint256 _batchNo,
        uint256 _expiryDate,
        bool _isOrganic
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        suppliers[_productID] = Supplier({
            supplierID: _supplierID,
            dateTimeDelivered: block.timestamp,
            temperature: _temperature,
            specificationsAndProcessingInfo: _specificationsAndProcessingInfo,
            safeAboveAge: _safeAboveAge,
            isOrganic: _isOrganic
        });
        products[_productID].batchNo = _batchNo;
        products[_productID].expiryDate = _expiryDate;
        products[_productID].stage = 1;
    }

    /**
     * @notice regulator inputs the details when deliveried to the supplier Company
     * @dev regulator inputs details before supplier
     * @param _productID - product ID
     * @param _regulatorID - true if the quality check is passed and cleared
     * @param _permitRequirementsFulfilled - true if certified as safer to consume
     * @param _sanctionsImposed - the age above which it is safe to consume
     */
    function regulatorDetails(
        uint256 _productID,
        uint256 _regulatorID,
        bool _permitRequirementsFulfilled,
        bool _sanctionsImposed,
        string memory _analysisInfo
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        regulators[_productID] = Regulator({
            regulatorID: _regulatorID,
            permitRequirementsFulfilled: _permitRequirementsFulfilled,
            sanctionsImposed: _sanctionsImposed,
            analysisInfo: _analysisInfo
        });
    }

    /**
     * @notice qualityAssuranceAnalyst inputs the details when deliveried to the supplier Company
     * @dev qualityAssuranceAnalyst inputs details before supplier
     * @param _productID - product ID
     * @param _assuranceID - true if the quality check is passed and cleared
     * @param _qualityStandardsMeet - true if certified as safer to consume
     * @param _audited - the age above which it is safe to consume
     * @param _verified - the age above which it is safe to consume
     */
    function qualityAssuranceAnalystDetails(
        uint256 _productID,
        uint256 _assuranceID,
        bool _qualityStandardsMeet,
        bool _audited,
        bool _verified,
        bool _guidelinesMeet,
        bool _compliant,
        uint256 _certifyingbodyID,
        string memory _certificationInfo
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        qualityAssuranceAnalysts[_productID] = QualityAssurance({
            assuranceID: _assuranceID,
            qualityStandardsMeet: _qualityStandardsMeet,
            audited: _audited,
            verified: _verified,
            guidelinesMeet: _guidelinesMeet,
            compliant: _compliant,
            certifyingbodyID: _certifyingbodyID,
            certificationInfo: _certificationInfo
        });
    }

    /**
     * @notice distributor inputs the details
     * @dev distributor inputs details when it received
     * @param _distributorID - distrubutor Company ID
     * @param _productID - the product ID
     * @param _temperature - the temperature at the time of delivery
     * @param _ordersReceived - number of orders received
     * @param _volume - the volume it received
     */
    function distributorDetails(
        uint256 _distributorID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _ordersReceived,
        uint256 _volume,
        string memory _warehouseFacilities,
        string memory _productHandlingInfo
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        distributors[_productID] = Distributor({
            distributorID: _distributorID,
            temperature: _temperature,
            ordersReceived: _ordersReceived,
            volume: _volume,
            dateTimeReceived: block.timestamp,
            warehouseFacilities: _warehouseFacilities,
            productHandlingInfo: _productHandlingInfo
        });
        products[_productID].stage = 3;
    }

    /**
     * @notice delivery Truck / logistics inputs the details
     * @dev delivery Truck / logistics inputs details when Delivery starts
     * @param _logisticsID - delivery Truck ID
     * @param _productID - the product ID
     * @param _temperature - the temperature when started with delivery
     * @param _volume - the volume it received
     */
    function logisticsDetails(
        uint256 _logisticsID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _modeOfTransport,
        uint256 _volume
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        logistics[_productID] = Logistics({
            logisticsID: _logisticsID,
            temperature: _temperature,
            volume: _volume,
            modeOfTransport: _modeOfTransport,
            dateTimeStartedDelivering: block.timestamp
        });
        products[_productID].stage = 4;
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
        uint256 _volume,
        string memory _complianceInfo,
        string memory _promotionalInfo,
        string memory _inventoryInfo
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        retailers[_productID] = Retailer({
            retailerID: _retailerID,
            temperature: _temperature,
            volume: _volume,
            dateTimeReceived: block.timestamp,
            complianceInfo: _complianceInfo,
            promotionalInfo: _promotionalInfo,
            inventoryInfo: _inventoryInfo
        });
        products[_productID].stage = 5;
    }

    /**
     * @notice consumer inputs the details
     * @dev consumer inputs details when received
     * @param _productID - the product ID
     * @param _unitsReceived - units it received
     * @param _temperature - the temperature when received
     * @param _satisfied - true if satisfied with the product
     */
    function consumerDetails(
        uint256 _productID,
        uint256 _consumerID,
        uint256 _unitsReceived,
        uint256 _temperature,
        bool _satisfied
    ) external {
        require(products.length > _productID, "Product doesnot exist");
        // or can be used as bool satsfied with the product condition
        customers[_productID].consumerID = _consumerID;
        if (
            _temperature < products[_productID].idealTemperature &&
            products[_productID].expiryDate > block.timestamp &&
            _satisfied
        ) {
            customers[_productID].unitsReceivedWithinStd += _unitsReceived;
        } else {
            customers[_productID].unitsReceivedOutsideStd += _unitsReceived;
        }
    }

    // all getters functions


    function getProduct(
        uint256 _productID
    ) external view returns (Product memory productDetails) {
        require(products.length > _productID, "Product doesnot exist");
        productDetails = products[_productID];
    }

    function getFarmer(
        uint256 _productID
    ) external view returns (Farmer memory farmer) {
        require(products.length > _productID, "Product doesnot exist");
        farmer = farmers[_productID];
    }

    function getSupplier(
        uint256 _productID
    ) external view returns (Supplier memory supplier) {
        require(products.length > _productID, "Product doesnot exist");
        supplier = suppliers[_productID];
    }

    function getRegulator(
        uint256 _productID
    ) external view returns (Regulator memory regulator) {
        require(products.length > _productID, "Product doesnot exist");
        regulator = regulators[_productID];
    }

    function getQualityAssurance(
        uint256 _productID
    ) external view returns (QualityAssurance memory qualityAssurance) {
        require(products.length > _productID, "Product doesnot exist");
        qualityAssurance = qualityAssuranceAnalysts[_productID];
    }

    function getDistributor(
        uint256 _productID
    ) external view returns (Distributor memory distributor) {
        require(products.length > _productID, "Product doesnot exist");
        distributor = distributors[_productID];
    }

    function getLogistics(
        uint256 _productID
    ) external view returns (Logistics memory trackLogistics) {
        require(products.length > _productID, "Product doesnot exist");
        trackLogistics = logistics[_productID];
    }

    function getRetailer(
        uint256 _productID
    ) external view returns (Retailer memory retailer) {
        require(products.length > _productID, "Product doesnot exist");
        retailer = retailers[_productID];
    }

    function getConsumer(
        uint256 _productID
    ) external view returns (Consumer memory consumer) {
        require(products.length > _productID, "Product doesnot exist");
        consumer = customers[_productID];
    }

}
