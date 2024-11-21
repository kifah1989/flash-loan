import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("USDTFlashModule", (m) => {
	const usdtFlash = m.contract("FlashLoan", [
		process.env.POOL_ADDRESS_PROVIDER as string,
	]);

	return { usdtFlash };
});

export default LockModule;
