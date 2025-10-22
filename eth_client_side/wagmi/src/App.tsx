import "./App.css";
import {
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
  WagmiProvider,
} from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TextLoop from "./Text_pop";
const client = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <TextLoop fontSize={"text-base md:text-lg"} fontWeight={"font-bold"} />
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
function ConnectWallet() {
  const connector = useConnectors();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  if (address) {
    return (
      <div>
        you are connected {address}
        <button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }
  return (
    <div>
      {connector.map((connector) => (
        <button
          onClick={() => {
            connect({ connector: connector });
          }}
          key={connector.id || connector.name}
        >
          Connect via {connector.name}
        </button>
      ))}
    </div>
  );
}
export default App;
