import React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
const Get_balance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function getUserBalance() {
    const balance = await connection.getBalance(wallet.publicKey);
    document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
  }
  getUserBalance();
  return (
    <div>
      Balance: <span id="balance"></span> SOL
    </div>
  );
};

export default Get_balance;
