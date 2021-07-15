export const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];
const chainId = 4;
export const domainImp = {
  name: "FractionGrid",
  version: "1",
  chainId: chainId,
  verifyingContract: "0x0F990Ef7eC160f01AF7148B74CC8a86FE46c551e", //smart contract address
};

export const fnft = [
  { name: "name", type: "string" },
  { name: "id", type: "uint256" },
  { name: "symbol", type: "string" },
  { name: "description", type: "string" },
];

const nftId = 1000;
export const fnftImp = {
  name: "FractionNFT",
  id: nftId,
  symbol: "FNFT",
  description: "The best Fraction FNT",
};

export const message = JSON.stringify({
  types: {
    EIP712Domain: domain,
    Fnft: fnft,
  },
  domain: domainImp,
  primaryType: "Fnft",
  message: fnftImp,
});

export const verify2_json = {
  name: "verify2",
  type: "function",
  inputs: [
    {
      type: "address",
      name: "signer",
    },
    {
      type: "bytes32",
      name: "sigR",
    },
    {
      type: "bytes32",
      name: "sigS",
    },
    {
      type: "uint8",
      name: "sigV",
    },
  ],
};