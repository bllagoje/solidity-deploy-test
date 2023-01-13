const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile"); // Import from "compile.js"
const dotenv = require('dotenv');
dotenv.config()


// Provider:
const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URL
);

const web3 = new Web3(provider);

// Deploy (on Goerli test network):
const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account: ${accounts[0]}`);
    
    let result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["Hello World"] })
        .send({ gas: "1000000", from: accounts[0] });

    console.log(`Contract deployed to: ${result.options.address}`);
    provider.engine.stop();
};

// Call Deploy:
deploy();
