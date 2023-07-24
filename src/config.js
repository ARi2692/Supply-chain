export const networkConfig = {
    "80001": [
        {
            supplyChainAddress: "0x2D3921f91BCb780BE8074B33bE1677e5eCC68202", 
            token_icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022",
            alt: "MATIC",
            networkName: "Mumbai"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]
