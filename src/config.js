export const networkConfig = {
    "80001": [
        {
            supplyChainAddress: "0x5d8F8Bed7C12695194fFC50ee50c2116Ffc0D1Ac", 
            token_icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022",
            alt: "MATIC",
            networkName: "Mumbai"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]
