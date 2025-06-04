//this script will add liquidity to already created Raydium devnet pool
import { } from "@solana/web3.js"
import { Percent } from "@raydium-io/raydium-sdk-v2";
import { initSdk, txVersion, connection } from "../config.js"
import BN from 'bn.js';
import Decimal from "decimal.js";


export const deposit = async () => {
    const raydium = await initSdk();
    const poolID = '4w8UCBufhEKYv1PEUZUD9YAuQxrGAPL5sDgeLPDYPw2T';


    const data = await raydium.cpmm.getPoolInfoFromRpc(poolID);
    const poolInfo = data.poolInfo;
    const poolKeys = data.poolKeys;
    const uiInputAmount = '10';
    const inputAmount = new BN(new Decimal(uiInputAmount).mul(10 ** poolInfo.mintA.decimals).toFixed(0));
    const slippage = new Percent(1, 100);
    const baseIn = false;


    const { execute } = await raydium.cpmm.addLiquidity({
        poolInfo,
        poolKeys,
        inputAmount,
        baseIn,
        slippage,
        txVersion
    })
    const { txId } = await execute({ sendAndConfirm: true });
    console.log(txId);



}
deposit();                      