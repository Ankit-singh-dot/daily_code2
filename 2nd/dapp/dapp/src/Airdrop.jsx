import React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const Airdrop = () => {
  const wallet = useWallet();
  const connection = useConnection();
  const amount = document.getElementById("send").value;
  async function SendAirDrop() {
    //   connection.requestAirdrop(wallet.publicKey, 10);
    await connection.connection.requestAirdrop(wallet.publicKey, amount*1000000000);
    alert(document.getElementById("send").value);
  }
  return (
    <div>
      {/* Hi user {wallet.publicKey.toString()} */}
      <input id="send" type="number" placeholder="amount" />
      <button onClick={SendAirDrop}>Send AirDrop</button>
    </div>
  );
};

export default Airdrop;
