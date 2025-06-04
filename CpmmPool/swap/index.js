import raydiumSdk, { CurveCalculator, initPoolLayout, Percent, printSimulate } from '@raydium-io/raydium-sdk-v2';
import { initSdk } from '../config.js';
import { NATIVE_MINT } from '@solana/spl-token';
import BN from 'bn.js'

const swap = async () => {
    const raydium = await initSdk();
    const inputAmount = new BN(0.1);
    const inputMint = '2Yi6gyy6L28QR1z9KWPrCgSLMVQf7acSVoCBWg3cS1Me';

    const poolId = '4w8UCBufhEKYv1PEUZUD9YAuQxrGAPL5sDgeLPDYPw2T';

    const data = await raydium.cpmm.getPoolInfoFromRpc(poolId);
    const poolInfo = data.poolInfo;
    const poolKeys = data.poolKeys;
    const rpcData = data.rpcData;
    const baseIn = true;
    const slippage = new Percent(5, 100);
    // console.log(rpcData);

    if (inputMint != poolInfo.mintA.address && inputMint != poolInfo.mintB.address)
        throw new Error('Input Mint doesnt match the PoolId');

    const swapResult = CurveCalculator.swap(
        inputAmount,
        baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
        baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
        rpcData.configInfo.tradeFeeRate
    )

    const { execute } = await raydium.cpmm.swap({
        poolInfo,
        poolKeys,
        baseIn,
        inputAmount,
        swapResult,
        slippage
    })

    const { txId } = await execute({ sendAndConfirm: true });
    console.log(`swapped successfully`, txId);

};
swap()


