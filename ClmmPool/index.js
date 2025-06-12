import { DEVNET_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";
import { initSdk, txVersion } from "../config.js"
import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import BN from "bn.js";
import { NATIVE_MINT } from "@solana/spl-token";
import { clmmConfigs } from "./util.js";



export const createPool = async () => {
    const raydium = await initSdk();
    const mint1 = await raydium.token.getTokenInfo('DZBmjJWM57rK5DWZfHjY5XJSUj115jECyAWFYRtZrsqb');
    const mint2 = await raydium.token.getTokenInfo(NATIVE_MINT);
    const initialPrice = new Decimal(1);

    const { execute, extInfo } = await raydium.clmm.createPool({
        programId: DEVNET_PROGRAM_ID.CLMM,
        mint1,
        mint2,
        ammConfig: {  //speads all prop for clmmConfigs[0] 
            ...clmmConfigs[0],
            id: new PublicKey(clmmConfigs[0].id),
            description: '',
            fundOwner: ''
        },
        initialPrice,
        txVersion
    })
    // console.log('These are the related pool keys', extInfo);
    const { txId } = await execute({ sendAndConfirm: true });
    console.log("This is the tx ID:", txId);

}
createPool();
