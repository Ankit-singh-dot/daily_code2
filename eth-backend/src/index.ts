import { JsonRpcProvider, id } from "ethers";
const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/896mSQKk2EJJDArgZbIIO"
);
async function pollBlock(blockNumber: number) {
  const logs = await provider.getLogs({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    fromBlock: blockNumber,
    toBlock: blockNumber + 2,
    topics: [id("Transfer(address,address,uint256)")],
  });
  console.log(logs);
}
pollBlock(23641571);

async function main() {
  const currentBlock = 23641571;
  while (1) {
    await pollBlock(currentBlock);
  }
}
