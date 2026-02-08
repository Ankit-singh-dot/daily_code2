import { Client } from "pg";
import express from "express";
const app = express();
app.use(express.json());
const pgClient = new Client({
    user: "neondb_owner",
    password: "npg_qwINB0sn2gFf",
    port: 5432,
    host: "ep-sweet-fire-aiksl86u-pooler.c-4.us-east-1.aws.neon.tech",
    database: "neondb",
    ssl: true,
});
await pgClient.connect();
app.post("/signup", async (req, res) => {
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const insertQuery = `INSERT INTO users (name, email , password) VALUES ('${userName}','${email}','${password}');`;
        // const response = await pgClient.query(insertQuery);
        console.log(insertQuery);
        res.json({
            message: "you have signed up ",
        });
    }
    catch (error) {
        res.json({
            message: "error while making the issue",
        });
    }
});
app.listen(3000);
// {
//   "username": "Ankit-sinfefegfewfwefewfefefefffewfwhnfnf",
//   "email": "ankit.tefefest@efefeefexample.com",
//     "password": "'); DELETE FROM users; --"
// }
//# sourceMappingURL=index.js.map