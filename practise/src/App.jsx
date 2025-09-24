import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import Send_token from "./Send_token.jsx";
import Get_balance from "./Get_balance.jsx";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
//  import Send_token from "./Send_token.jsx";
import Request_airdrop from "./Request_airdrop.jsx";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
// import Request_airdrop from "./Request_airdrop";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/1PzJ64B2r79Nj3YnAqNbOvwn217xVMmd"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          {/* Your app's components go here, nested within the context providers. */}
          <Request_airdrop />
          <Send_token />
          <Get_balance />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
