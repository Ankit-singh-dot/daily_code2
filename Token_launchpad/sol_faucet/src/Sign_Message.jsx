import React from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
// import { error } from "console";
const Sign_Message = () => {
  const { publicKey, signMessage } = useWallet();
  async function onclick() {
    if (!publicKey) throw new Error("waller not collected ");
    if (!signMessage) throw new Error("wallet doesn't support message signing");
    const message = document.getElementById("message").value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Messages signature invalid ");
    alert("success", `message signature:${bs58.encode(signature)}`);
  }
  return (
    <div>
      <input
        type="text"
        id="message"
        placeholder="enter the message which you want to send"
      />
      <button onClick={onclick}>Sign Message</button>
    </div>
  );
};

export default Sign_Message;
