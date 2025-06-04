import { CREATE_CPMM_POOL_FEE_ACC, DEVNET_PROGRAM_ID, getCpmmPdaAmmConfigId } from "@raydium-io/raydium-sdk-v2";
import { sendAndConfirmRawTransaction } from "@solana/web3.js"
import { initSdk, txVersion, owner, connection } from "../config.js";
import BN from "bn.js";

export const createPool = async () => {

    const raydium = await initSdk();
    const mintA = await raydium.token.getTokenInfo('DZBmjJWM57rK5DWZfHjY5XJSUj115jECyAWFYRtZrsqb');
    const mintB = await raydium.token.getTokenInfo('2Yi6gyy6L28QR1z9KWPrCgSLMVQf7acSVoCBWg3cS1Me');

    const feeConfigs = await raydium.api.getCpmmConfigs();

    feeConfigs.forEach((config) => {
        config.id = getCpmmPdaAmmConfigId(DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM, config.index).publicKey.toBase58();
    })

    const PROGRAM_ID =
        raydium.cluster === "devnet"
            ? DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM
            : ALL_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM;
    const POOL_FEE_ACCOUNT = raydium.cluster === "devnet"
        ? DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_FEE_ACC
        : ALL_PROGRAM_ID.CREATE_CPMM_POOL_FEE_ACC;

    const { transaction, extInfo } = await raydium.cpmm.createPool({
        programId: PROGRAM_ID,
        poolFeeAccount: POOL_FEE_ACCOUNT,
        mintA,
        mintB,
        mintAAmount: new BN(100),
        mintBAmount: new BN(100),
        startTime: new BN(0),
        feeConfig: feeConfigs[0],
        associatedOnly: false,
        ownerInfo: {
            useSOLBalance: true
        },
        txVersion,

    })
    console.log("these are the keys:", extInfo);
    // console.log(transaction);
    const latestBlockhash = await connection.getLatestBlockhash()
    transaction.message.recentBlockhash = latestBlockhash.blockhash;
    transaction.sign([owner]);
    const sig = await sendAndConfirmRawTransaction(
        connection,
        transaction.serialize(),
        [owner]
    );
    await connection.confirmTransaction(sig, 'confirmed');
    console.log('✅ Transaction sent:', sig);
}
createPool();

