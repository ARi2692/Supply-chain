export const networkConfig = {
    "80001": [
        {
            supplyChainAddress: "0xfE5E29398c4Ee928DE5662A5687F6EA38BDcF401", 
            token_icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022",
            alt: "MATIC",
            networkName: "Mumbai"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]
