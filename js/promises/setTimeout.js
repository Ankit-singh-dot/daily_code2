// Promisified version of setTimeout =>
function setTimeoutPromisified(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

setTimeoutPromisified(3000).then(() => {
  console.log("3 second have been passed ");
});
