require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/xzSfy9phyvjuPdLL6NI2FAzbsPYIe7Y9",
      accounts: [
        "46f31d7f22f8b36dbbbfcf2520c229053671fdca03dcd65e8f2e8b8e571b4050",
      ],
    },
  },
};
