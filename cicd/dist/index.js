import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const prismaClient = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
const app = express();
app.get("/", async (req, res) => {
    const data = await prismaClient.user.findMany();
    res.json({
        data,
    });
});
app.post("/", async (req, res) => {
    await prismaClient.user.create({
        data: {
            name: Math.random().toString(),
            password: Math.random().toString(),
        },
    });
    res.json({
        message: "post endpoint",
    });
});
app.listen(2410, () => {
    console.log("listening to the port 2410");
});
//# sourceMappingURL=index.js.map