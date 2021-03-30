require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new HDWalletProvider(
  process.env.MATIC_PRIVATE_KEY,
  "https://rpc-mainnet.maticvigil.com/"
);

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "caracteristica",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "valorHash",
        type: "bytes32",
      },
    ],
    name: "Caracteristica",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "topHash",
        type: "bytes32",
      },
    ],
    name: "Merkle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "usuario",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "NuevaMoto",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nuevoUsario",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "usuarioAnterior",
        type: "uint256",
      },
    ],
    name: "Transferencia",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "speed",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "brand",
        type: "string",
      },
      {
        internalType: "string",
        name: "model",
        type: "string",
      },
    ],
    name: "agregarMoto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "motoId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "caracteristica",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "valorHash",
        type: "bytes32",
      },
    ],
    name: "agregarPropiedad",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "motoId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nuevoUsuario",
        type: "uint256",
      },
    ],
    name: "transferirMoto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
    ],
    name: "guardarTopHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "motoId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "caracteristica",
        type: "string",
      },
    ],
    name: "leerCaracteristica",
    outputs: [
      {
        internalType: "bytes32",
        name: "valorHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "motoId",
        type: "uint256",
      },
    ],
    name: "infoMoto",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "year",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speed",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "brand",
            type: "string",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
        ],
        internalType: "struct Almacenamiento.Moto",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const web3 = new Web3(provider);
const instance = new web3.eth.Contract(abi, "0x65BAA990e7e41f007A1B198758bCd07A38A61541");

module.exports = { web3, instance };
