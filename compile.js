const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Smart Contract Path:
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// Read content of the file:
const source = fs.readFileSync(inboxPath, "UTF8");
// Compile, export "contracts" > "Inbox" property:
module.exports = solc.compile(source, 1).contracts[":Inbox"];


// ------------------------------------------------------------------
// console.log(solc.compile(source, 1).contracts[":Inbox"]);