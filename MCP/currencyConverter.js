import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "currency_converter",
  version: "1.0.0",
});

server.tool(
  "convertCurrency",
  "convert amount from one currency to another",
  {
    amount: z.number().describe("Amount to convert for e.g. 100"),
    from: z.string().describe("Base currency code , e.g. USD"),
    to: z.string().describe("Target currency code , e.g. INR"),
  },
  async ({ amount, from, to }) => {
    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${from.toUpperCase()}`
      );
      const data = await res.json();
      const rate = data.rates[to.toUpperCase()];
      const converted = (amount * rate).toFixed(2);
      const result = `${amount} ${from.toUpperCase()} = ${converted} ${to.toUpperCase()}`;
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error:${error.message} `,
          },
        ],
      };
    }
  }
);

async function startServer(params) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP convert currency server started");
}

startServer().catch((error) => {
  console.error("failed to start MCP server", error);
  process.exit(1);
});
