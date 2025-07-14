export const DudiKicksABI = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "BASE_MULTIPLIER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DENOM",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_BETTING",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_DAILY_BETTING",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_BETTING",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "clientWallet",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "dailyBetting",
    inputs: [
      {
        name: "day",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "totalBetting",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeBps",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeTo",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserGameIds",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_client",
        type: "address",
        internalType: "address",
      },
      {
        name: "_router",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeTo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeBps",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_numConfirmations",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "kick",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "prediction",
        type: "tuple",
        internalType: "struct DudiKicks.GoalPrediction",
        components: [
          {
            name: "isSuccess",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "direction",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "haveDirection",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "gameId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "kickCallback",
    inputs: [
      {
        name: "_nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "rngList",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "gameId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isWin",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "kickInfo",
    inputs: [
      {
        name: "gameId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "kicker",
        type: "address",
        internalType: "address",
      },
      {
        name: "prediction",
        type: "tuple",
        internalType: "struct DudiKicks.GoalPrediction",
        components: [
          {
            name: "isSuccess",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "direction",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "haveDirection",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "result",
        type: "tuple",
        internalType: "struct DudiKicks.GameResult",
        components: [
          {
            name: "isSuccess",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "direction",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isWin",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "reward",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "rng",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "createdAt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "endedAt",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lastGameId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "manualExecution",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "numConfirmations",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "point",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "totalBetting",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalGameId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateFeeBps",
    inputs: [
      {
        name: "_feeBps",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMaxBetting",
    inputs: [
      {
        name: "_maxBetting",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMaxDailyBetting",
    inputs: [
      {
        name: "_maxDailyBetting",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMinBetting",
    inputs: [
      {
        name: "_minBetting",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatePoint",
    inputs: [
      {
        name: "_point",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userGameIds",
    inputs: [
      {
        name: "kicker",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "games",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vrfRouter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IVrfRouter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "CreateGame",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "gameId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "prediction",
        type: "tuple",
        indexed: false,
        internalType: "struct DudiKicks.GoalPrediction",
        components: [
          {
            name: "isSuccess",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "direction",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "haveDirection",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EndGame",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "gameId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "reward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "result",
        type: "tuple",
        indexed: false,
        internalType: "struct DudiKicks.GameResult",
        components: [
          {
            name: "isSuccess",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "direction",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isWin",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManualExecution",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "numConfirmations",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "clientWallet",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AllGameIsDone",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidLength",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidValue",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "UnAuthorizedRouter",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "UnsupportedToken",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;
