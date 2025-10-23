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
import { AllowUSDT } from "./AllowUSDT";
const client = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <TextLoop fontSize={"text-base md:text-lg"} fontWeight={"font-bold"} />
        <ConnectWallet />
        <Account />
        <AllowUSDT />
        <TotalSupply />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
function Account() {
  const { address } = useAccount();
  return (
    <div>
      {address ? "you are connected" + address : "you are not connected"}
    </div>
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
  const { address } = useAccount();
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    // here this is oonly contracting with this data only totalsuply rn we care not calling the other USDT_abi.ts
    abi: [
      {
        constant: true,
        inputs: [{ name: "who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: ["0x2FB74a1Aba743c5fFa43A803F1b0c3e0CD6Ff7C8"],
  });
  console.log(data);
  return <div>Total supply is {data?.toString()}</div>;
}
export default App;
// to interact with smart_contract we have to use ABI=application binary interface
