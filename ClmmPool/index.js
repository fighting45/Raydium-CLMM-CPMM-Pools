import { DEVNET_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";
import { initSdk, txVersion } from "../config.js"
import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import BN from "bn.js";
import { NATIVE_MINT } from "@solana/spl-token";



export const createPool = async () => {
    const raydium = await initSdk();
    const mint1 = await raydium.token.getTokenInfo('DZBmjJWM57rK5DWZfHjY5XJSUj115jECyAWFYRtZrsqb');
    const mint2 = await raydium.token.getTokenInfo(NATIVE_MINT);


    const clmmConfigs = [
        {
            id: 'CQYbhr6amxUER4p5SC44C63R4qw4NFc9Z4Db9vF4tZwG',
            index: 0,
            protocolFeeRate: 120000,
            tradeFeeRate: 100,
            tickSpacing: 10,
            fundFeeRate: 40000,
            description: 'Best for very stable pairs',
            defaultRange: 0.005,
            defaultRangePoint: [0.001, 0.003, 0.005, 0.008, 0.01],
        },
        {
            id: 'B9H7TR8PSjJT7nuW2tuPkFC63z7drtMZ4LoCtD7PrCN1',
            index: 1,
            protocolFeeRate: 120000,
            tradeFeeRate: 2500,
            tickSpacing: 60,
            fundFeeRate: 40000,
            description: 'Best for most pairs',
            defaultRange: 0.1,
            defaultRangePoint: [0.01, 0.05, 0.1, 0.2, 0.5],
        },
        {
            id: 'GjLEiquek1Nc2YjcBhufUGFRkaqW1JhaGjsdFd8mys38',
            index: 3,
            protocolFeeRate: 120000,
            tradeFeeRate: 10000,
            tickSpacing: 120,
            fundFeeRate: 40000,
            description: 'Best for exotic pairs',
            defaultRange: 0.1,
            defaultRangePoint: [0.01, 0.05, 0.1, 0.2, 0.5],
        },
        {
            id: 'GVSwm4smQBYcgAJU7qjFHLQBHTc4AdB3F2HbZp6KqKof',
            index: 2,
            protocolFeeRate: 120000,
            tradeFeeRate: 500,
            tickSpacing: 10,
            fundFeeRate: 40000,
            description: 'Best for tighter ranges',
            defaultRange: 0.1,
            defaultRangePoint: [0.01, 0.05, 0.1, 0.2, 0.5],
        },
    ];
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