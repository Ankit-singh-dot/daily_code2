import { Client } from "pg";
("postgresql://neondb_owner:npg_qwINB0sn2gFf@ep-sweet-fire-aiksl86u-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_qwINB0sn2gFf",
  port: 5432,
  host: "ep-sweet-fire-aiksl86u-pooler.c-4.us-east-1.aws.neon.tech",
  database: "neondb",
  ssl: true,
});

async function main() {
  await pgClient.connect();
//   const response = await pgClient.query(`CREATE TABLE users(
//     id SERIAL PRIMARY KEY ,
//     name VARCHAR(50),
//     email VARCHAR(100) UNIQUE,
//     password TEXT
//     )`);
//   console.log(response);

  const response2 = await pgClient.query("SELECT * FROM users");
  console.log(response2.rows);
}
main();
