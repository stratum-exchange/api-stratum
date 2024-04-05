module.exports = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_multipool",
        type: "address",
      },
    ],
    name: "getPoolInfo",
    outputs: [
      {
        internalType: "address[]",
        name: "_token",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_reserves",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "_lpToken",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_multipool",
        type: "address",
      },
    ],
    name: "getTokenInfo",
    outputs: [
      {
        internalType: "address[]",
        name: "_token",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_reserves",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
