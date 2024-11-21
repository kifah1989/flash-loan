import type { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import hre from "hardhat";
import "@tenderly/hardhat-tenderly";

import dotenv from "dotenv";
import { parseEther } from "viem";
dotenv.config();
interface ExtendedHardhatUserConfig extends HardhatUserConfig {
	etherscan: {
		apiKey?: {};
	};
	ignition: {
		requiredConfirmations: number;
	};
	tenderly: {
		username: string;
		project: string;
	};
}
// npx hardhat getLoan --contract 0x9d997f06600Bb780d38FdD86DE8968490803e651 --token-address 0x55d398326f99059fF775485246999027B3197955 --usdt-amount 10 --network bnb
task("getLoan", "get a flash loan")
	.addParam("contract", "The contract address")
	.addParam("tokenAddress", "The user address")
	.addParam("usdtAmount", "The amount in USDT")
	.setAction(async (taskArgs, hre) => {
		const contract = taskArgs.contract;
		const tokenAddress = taskArgs.tokenAddress;
		const usdtAmount = parseEther(taskArgs.usdtAmount);
		console.log(usdtAmount);
		async function getContract(contract: `0x${string}`) {
			return await hre.viem.getContractAt("FlashLoan", contract);
		}

		const tx = await getContract(contract).then((contract) =>
			contract.write.requestFlashLoan([tokenAddress, usdtAmount])
		);

		console.log(tx);
	});

const config: HardhatUserConfig = {
	networks: {
		bnb: {
			url: process.env.RPC,
			accounts: [process.env.PRIVATE_KEY as string],
		},
		sepolia: {
			url: process.env.RPC,
			accounts: [process.env.PRIVATE_KEY as string],
		},
	},
	tenderly: {
		username: "kifah",
		project: "kefi",
	},
	solidity: {
		compilers: [{ version: "0.8.27" }, { version: "0.5.16" }],
	},
	ignition: {
		requiredConfirmations: 1,
	},
};

export default config;
