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
        uint256 batchNo; // supplier will input
        uint256 harvestDate;
        uint256 expiryDate; // supplier will input
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

    modifier productPresent(uint256 productID) {
        require(products.length > productID, "Product doesnot exist");
        _;
    }

    /**
     * @notice farmer inputs the details when deliveried to the supplier Company
     * @dev farmer inputs details and adds the product details
     * @param _farmerID - farmer ID
     * @param _productName - the product name
     * @param _origin - the origin place of the product
     * @param _harvestDate - harvest date of the product
     * @param _totalVolume - total volume deliveried to the supplier
     * @param _temperatureLimit - the temperature limit below which the product should be kept
     * @param _envInfo - any additional instructions provided by the farmer regarding environment factors
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
                expiryDate: 0, 
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
     * @notice supplier inputs the details after processing
     * @dev supplier inputs details 
     * @param _supplierID - Supplier ID
     * @param _productID - the product ID
     * @param _temperature - the temperature at the time of delivery
     * @param _specificationsAndProcessingInfo - specifications And Processing Info
     * @param _safeAboveAge - safe above the age 
     * @param _batchNo - the batch number of the product
     * @param _expiryDate - the expiry date
     * @param _isOrganic - is organic
     */
    function processorAndSupplierDetails(
        uint256 _supplierID,
        uint256 _productID,
        uint256 _temperature,
        string calldata _specificationsAndProcessingInfo,
        uint256 _safeAboveAge,
        uint256 _batchNo,
        uint256 _expiryDate,
        bool _isOrganic
    ) external productPresent(_productID)  {
        require(products[_productID].stage == 0, "Product not yet authorized for processing");
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
     * @notice regulator inputs the details after supplier
     * @dev regulator inputs details
     * @param _productID - product ID
     * @param _regulatorID - regulator ID
     * @param _permitRequirementsFulfilled - permit Requirements Fulfilled
     * @param _sanctionsImposed - sanctions Imposed
     * @param _analysisInfo - analysis Info
     */
    function regulatorDetails(
        uint256 _productID,
        uint256 _regulatorID,
        bool _permitRequirementsFulfilled,
        bool _sanctionsImposed,
        string memory _analysisInfo
    ) external productPresent(_productID) {
        require(products[_productID].stage == 1, "Product not for regulator");
        regulators[_productID] = Regulator({
            regulatorID: _regulatorID,
            permitRequirementsFulfilled: _permitRequirementsFulfilled,
            sanctionsImposed: _sanctionsImposed,
            analysisInfo: _analysisInfo
        });
        products[_productID].stage = 2;
    }

    /**
     * @notice qualityAssuranceAnalyst inputs the details after regulator
     * @dev qualityAssuranceAnalyst inputs details 
     * @param _productID - product ID
     * @param _assuranceID - assurance ID
     * @param _qualityStandardsMeet - _quality Standards Meet
     * @param _audited - audited or not?
     * @param _verified - verified or not?
     * @param _guidelinesMeet - guidelines Meet or not?
     * @param _compliant - compliant or not?
     * @param _certifyingbodyID - certifyingbody ID 
     * @param _certificationInfo - certification Info 
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
    ) external productPresent(_productID) {
        require(products[_productID].stage == 2, "Product not for quality assurance");
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
        products[_productID].stage = 3;
    }

    /**
     * @notice distributor inputs the details after quality assurance
     * @dev distributor inputs details when it received
     * @param _distributorID - distrubutor Company ID
     * @param _productID - the product ID
     * @param _temperature - the temperature at the time of delivery
     * @param _ordersReceived - number of orders received
     * @param _volume - the volume it received
     * @param _warehouseFacilities - warehouse Facilities
     * @param _productHandlingInfo - product Handling Info
     */
    function distributorDetails(
        uint256 _distributorID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _ordersReceived,
        uint256 _volume,
        string memory _warehouseFacilities,
        string memory _productHandlingInfo
    ) external productPresent(_productID) {
        require(products[_productID].stage == 3, "Product not for distributor");
        distributors[_productID] = Distributor({
            distributorID: _distributorID,
            temperature: _temperature,
            ordersReceived: _ordersReceived,
            volume: _volume,
            dateTimeReceived: block.timestamp,
            warehouseFacilities: _warehouseFacilities,
            productHandlingInfo: _productHandlingInfo
        });
        products[_productID].stage = 4;
    }

    /**
     * @notice delivery Truck / logistics inputs the details
     * @dev delivery Truck / logistics inputs details when Delivery starts
     * @param _logisticsID - delivery Truck / logistics ID
     * @param _productID - the product ID
     * @param _temperature - the temperature when started with delivery
     * @param _modeOfTransport - mode Of Transport 0-road, 1-train, 2-water, 3-air
     * @param _volume - the volume it received
     */
    function logisticsDetails(
        uint256 _logisticsID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _modeOfTransport,
        uint256 _volume
    ) external productPresent(_productID) {
        require(products[_productID].stage == 4, "Product not for logistics");
        logistics[_productID] = Logistics({
            logisticsID: _logisticsID,
            temperature: _temperature,
            volume: _volume,
            modeOfTransport: _modeOfTransport,
            dateTimeStartedDelivering: block.timestamp
        });
        products[_productID].stage = 5;
    }

    /**
     * @notice retailer inputs the details
     * @dev retailer inputs details when received
     * @param _retailerID - Retailer ID
     * @param _productID - the product ID
     * @param _temperature - the temperature when received
     * @param _volume - the volume it received
     * @param _complianceInfo - compliance Info
     * @param _promotionalInfo - promotional Info
     * @param _inventoryInfo - inventory Info
     */
    function retailerDetails(
        uint256 _retailerID,
        uint256 _productID,
        uint256 _temperature,
        uint256 _volume,
        string memory _complianceInfo,
        string memory _promotionalInfo,
        string memory _inventoryInfo
    ) external productPresent(_productID) {
        require(products[_productID].stage == 5, "Product not for retailer");
        retailers[_productID] = Retailer({
            retailerID: _retailerID,
            temperature: _temperature,
            volume: _volume,
            dateTimeReceived: block.timestamp,
            complianceInfo: _complianceInfo,
            promotionalInfo: _promotionalInfo,
            inventoryInfo: _inventoryInfo
        });
        products[_productID].stage = 6;
    }

    /**
     * @notice consumer inputs the details
     * @dev consumer inputs details when received
     * @param _productID - the product ID
     * @param _consumerID - the consumer ID
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
    ) external productPresent(_productID) {
        require(products[_productID].stage == 6, "Product not for consumer yet!");
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
    ) productPresent(_productID) external view returns (Product memory productDetails) {
        productDetails = products[_productID];
    }

    function getFarmer(
        uint256 _productID
    ) productPresent(_productID) external view returns (Farmer memory farmer) {
        farmer = farmers[_productID];
    }

    function getSupplier(
        uint256 _productID
    ) productPresent(_productID) external view returns (Supplier memory supplier) {
        supplier = suppliers[_productID];
    }

    function getRegulator(
        uint256 _productID
    ) productPresent(_productID) external view returns (Regulator memory regulator) {
        regulator = regulators[_productID];
    }

    function getQualityAssurance(
        uint256 _productID
    ) productPresent(_productID) external view returns (QualityAssurance memory qualityAssurance) {
        qualityAssurance = qualityAssuranceAnalysts[_productID];
    }

    function getDistributor(
        uint256 _productID
    ) productPresent(_productID) external view returns (Distributor memory distributor) {
        distributor = distributors[_productID];
    }

    function getLogistics(
        uint256 _productID
    ) productPresent(_productID) external view returns (Logistics memory trackLogistics) {
        trackLogistics = logistics[_productID];
    }

    function getRetailer(
        uint256 _productID
    ) productPresent(_productID) external view returns (Retailer memory retailer) {
        retailer = retailers[_productID];
    }

    function getConsumer(
        uint256 _productID
    ) productPresent(_productID) external view returns (Consumer memory consumer) {
        consumer = customers[_productID];
    }
}
