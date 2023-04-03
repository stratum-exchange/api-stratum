module.exports = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_internal_bribe",
        type: "address",
      },
      {
        internalType: "address",
        name: "_external_bribe",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ve",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isPair",
        type: "bool",
      },
      {
        internalType: "address[]",
        name: "allowedRewards",
        type: "address[]",
      },
    ],
    name: "createGauge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "last_gauge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
