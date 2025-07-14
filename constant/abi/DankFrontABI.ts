export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "dankKickAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "latestN",
        type: "uint256",
      },
    ],
    name: "getLeaderBoard",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalReward",
            type: "uint256",
          },
        ],
        internalType: "struct DankFront.TopPlayerInfo[]",
        name: "topPlayers",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dankKickAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "skip",
        type: "uint256",
      },
    ],
    name: "getParticipants",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "endedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isSuccess",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "direction",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "haveDirection",
                type: "bool",
              },
            ],
            internalType: "struct DankKick.GoalPrediction",
            name: "prediction",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isSuccess",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "direction",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isWin",
                type: "bool",
              },
            ],
            internalType: "struct DankKick.GameResult",
            name: "result",
            type: "tuple",
          },
        ],
        internalType: "struct DankFront.ParticipantInfo[]",
        name: "participants",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
