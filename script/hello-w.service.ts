

import { getAccount } from '@solana/spl-token';
import * as borsh from '@project-serum/borsh';
import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
    AccountMeta,
  } from '@solana/web3.js';
  import { sha256, sha224 } from 'js-sha256';


let connection = new Connection('https://api.devnet.solana.com', 'confirmed')

let keyPair = Keypair.generate();

let anotherKeyPair = Keypair.generate();

let programId = new PublicKey('3dVTBPaADCVUGtDLRMitEdrj86YQLwVHVdsBvJRTn3PD');


export async function getAirdrop() {
    const sig = await connection.requestAirdrop(
        keyPair.publicKey,
        LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(sig);
    console.log('using account',sig);
}

export async function initialize(): Promise<void> {
    await getAirdrop();
    console.log("initial platform", keyPair.publicKey.toBase58());
    const prefix = Buffer.from(sha256('global:initialize').toString(), 'hex')
    const truncatedPrefix = prefix.slice(0, 8)
    const buffer = Buffer.alloc(32);
    const layout= borsh.struct([
      ])
    const span = layout.encode({}, buffer);
    const instruction = new TransactionInstruction({
        keys: [{pubkey: keyPair.publicKey, isSigner: true, isWritable: false}],
        programId: programId,
        data: Buffer.from([...truncatedPrefix, ...buffer.slice(0, span)]),
    }
    );
    const txSignature = await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [keyPair],
    );
    console.log(txSignature)
}

initialize();