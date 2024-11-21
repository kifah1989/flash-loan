import { tenderly } from "hardhat";

async function main() {
	await tenderly.verify({
		name: "BEP20USDT",
		address: "0x03167886d53F5018cA5F286982c453f37Db803aE",
	});
}

main()
	.then(() => process.exit())
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
