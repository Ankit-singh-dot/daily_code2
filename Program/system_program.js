import {
  Keypair,
  SystemProgram,
  Connection,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const payer = Keypair.fromSecretKey(
  Uint8Array.from([
    212, 245, 83, 210, 0, 63, 231, 45, 25, 137, 171, 174, 100, 198, 115, 72, 7,
    195, 228, 150, 27, 96, 231, 216, 45, 132, 41, 239, 214, 97, 130, 30, 205,
    159, 95, 109, 42, 80, 149, 38, 72, 199, 155, 1, 222, 46, 231, 64, 21, 6,
    145, 78, 140, 66, 219, 115, 55, 49, 74, 73, 137, 206, 45, 132,
  ])
);
async function main() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const newAccount = Keypair.generate();
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: newAccount.publicKey,
      lamports: 1000000,
    })
  );
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);

  console.log(`✅ Transaction confirmed! Sig: ${signature}`);
  console.log(`Transferred to ${newAccount.publicKey.toBase58()}`);
}
main();
