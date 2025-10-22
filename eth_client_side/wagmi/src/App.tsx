import "./App.css";
import {
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
  useReadContract,
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
        <TotalSupply />
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
function TotalSupply() {
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        // here this is oonly contracting with this data only totalsuply rn we care not calling the other USDT_abi.ts
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });
  return <div>Total supply is {data?.toString()}</div>;
}
export default App;
// to interact with smart_contract we have to use ABI=application binary interface
