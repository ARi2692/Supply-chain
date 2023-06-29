export const networkConfig = {
    "80001": [
        {
            supplyChainAddress: "0x89C7930b59E51d1Bc788003E409799aF5092799d", 
            token_icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022",
            alt: "MATIC",
            networkName: "Mumbai"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]
