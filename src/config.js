export const networkConfig = {
    "80001": [
        {
            supplyChainAddress: "0x50b546246c07BC16b6E79F5c9122e241EC20B3c1", 
            token_icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022",
            alt: "MATIC",
            networkName: "Mumbai"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]
