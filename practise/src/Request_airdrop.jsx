import React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
const Request_airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  function RequestAirdrop() {
    const publicKey = wallet.publicKey;
    const amount = document.getElementById("amount").value;
    connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
  }
  return (
    <div>
      <input type="number" id="amount" placeholder="Enter the amount" />
      <button onClick={RequestAirdrop}>Request_airdrop</button>
    </div>
  );
};

export default Request_airdrop;
