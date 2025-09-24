import React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const Send_token = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function send_token() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection);
    alert("sent" + amount + "SOL to" + to);
  }
  return (
    <div>
      <input type="text" id="to" placeholder="to" />
      <input type="number" id="amount" placeholder="whom" />
      <button onClick={send_token}> Send_token</button>
    </div>
  );
};

export default Send_token;
