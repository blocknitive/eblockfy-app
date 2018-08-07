// module.exports = {
//   networks: {
//     alastria: {
//       host: "169.60.149.189",
//       port: 22000, // was 8545
//       network_id: "*", // Match any network id
//       gasPrice: 0,
//       gas: 4500000
//     }
//   }
// };
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    }
  }
};