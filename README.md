# Raydium-CLMM-CPMM-Pools

This repository provides Javascript scripts for interacting with Raydium's Concentrated Liquidity Market Maker (CLMM) and Constant Product Market Maker (CPMM) pools on the Solana blockchain. The implementations are based on the [Raydium SDK V2 Demo](https://github.com/raydium-io/raydium-sdk-V2-demo) and are designed for developers looking to understand and utilize Raydium's liquidity pool functionalities.

## Features

* **CLMM Pool Operations**: Scripts to create, add liquidity to, and remove liquidity from CLMM pools, allowing for efficient capital deployment within specific price ranges.
* **CPMM Pool Operations**: Scripts to interact with CPMM pools, facilitating traditional constant product market maker functionalities.
* **Configuration Management**: A `config.js` file to manage environment-specific settings such as wallet keys and RPC endpoints.

## Prerequisites

* Node.js and Yarn installed on your development machine.
* A Solana wallet with sufficient funds for transactions.
* Familiarity with TypeScript and Solana development practices.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/fighting45/Raydium-CLMM-CPMM-Pools.git
   cd Raydium-CLMM-CPMM-Pools
   ```



2. **Install Dependencies**:

   ```bash
   yarn install
   ```



3. **Configure Environment**:

   * Rename `config.js.template` to `config.js`.
   * Update the following fields in `config.js`:

     * `PRIVATE_KEY`: Your wallet's private key.
     * `RPC_URL`: Your preferred Solana RPC endpoint.
     * `API_HOST`: (Optional) Raydium API host, if required.

## Directory Structure

* `ClmmPool/`: Contains scripts related to CLMM pool operations.
* `CpmmPool/`: Contains scripts related to CPMM pool operations.
* `config.js`: Configuration file for environment-specific settings.
* `package.json`: Project metadata and dependencies.([github.com][2], [github.com][4], [github.com][5])

## Usage

Each script within the `ClmmPool` and `CpmmPool` directories is designed to perform specific operations. Before running any script, ensure that `config.js` is properly configured. Execute scripts using the following command:

```bash
yarn ts-node path/to/script.ts
```



Replace `path/to/script.ts` with the actual path to the script you intend to run.

## References

* [Raydium SDK V2 Demo](https://github.com/raydium-io/raydium-sdk-V2-demo)
* [Raydium SDK V2](https://github.com/raydium-io/raydium-sdk-V2)
* [Raydium CLMM](https://github.com/raydium-io/raydium-clmm)
* [Raydium Documentation](https://docs.raydium.io/raydium/protocol/developers)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.([github.com][6])

---

*Note: This repository is intended for educational and development purposes. Use at your own risk.*

