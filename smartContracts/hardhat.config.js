require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/-FhNfMnnxYNjzQqJMODvEULXJ6zOfQcI",
      accounts: [
        "169f5e988e9e80927a55ad358ef2d3a91fb973132ea5bfb052ff1413e6473c48",
      ],
    },
  },
};
