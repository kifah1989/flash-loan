import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BEP20USDT = buildModule("BEP20USDTModule", (m) => {
	const BEP20USDTFlash = m.contract("BEP20USDT");

	return { BEP20USDTFlash };
});

export default BEP20USDT;
