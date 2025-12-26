
// const promises = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const success = true;
//     if (success) {
//       resolve("data resolve");
//     } else {
//       reject("data rejected");
//     }
//   }, 1000);
// });

// promises
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("done");
//   });

// const promises = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const result = false;
//     if (result) {
//       resolve("yupp resolved ");
//     } else {
//       reject("yupp not resolved ");
//     }
//   }, 1000);
// });

// async function handlePromises() {
//   try {
//     const data = await promises;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("done");
//   }
// }

// handlePromises();

// async function getPost() {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     if (!res.ok) {
//       throw new Error("HTTPS ERROR: line 51  " + res.status);
//     }
//     const data = await res.json();
//     console.log(data);
//     // console.log(res);
//   } catch (error) {
//     console.log("Error: line 56", error.message);
//   }
// }

// getPost();

// const SMTP_Server = require("smtp-server").SMTPServer;
// const server = new SMTP_Server({
//   onConnect(session, cb) {
//     console.log(`onConnect`, session.id);
//     cb();
//   },
// });
// server.listen(25, () => console.log("server running on 25"));




