const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("Web3"); // Constructor function (Web3)
const { interface, bytecode } = require("../compile"); // Import from "compile.js"

// Instance of Web3 (+Ganache provider):
const web3 = new Web3(ganache.provider());

// Moca Testing:
{ 
// -----------------------------------------------------
// "Mocha" test functions:
// "it"         => Run a test and make an assertion.
// "describe"   => Groups together "it" functions.
// "beforeEach" => Execute some general setup code.
// -----------------------------------------------------

// -----------------------------------------------------
// Example class:
{ 
// class Car {
//     park() {
//         return "Stopped";
//     }

//     drive() {
//         return "Vroom";
//     }
// };

// // Example test:
// let car;
// beforeEach(() => {
//     // console.log("beforeEach()");
//     car = new Car();
// });

// describe("Car", () => {
//     it("Can park", () => {
//         assert.equal(car.park(), "Stopped");
//     });

//     it("Can drive", () => {
//         assert.equal(car.drive(), "Vroom");
//     });
// });
}
// -----------------------------------------------------
}

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts:
    accounts = await web3.eth.getAccounts();
    // Use one of them to deploy Contract:
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello World'] }) // Default message: "Hello World"
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("Deploys a contract", () => {
        assert.ok(inbox.options.address); // If address exists => OK
        // ------------------------
        // Console Logs:
        // console.log(accounts);
        // console.log(inbox);
    });

    it("Has default message", async () => {
        let message = await inbox.methods.message().call();
        assert.equal(message, "Hello World");
    });

    it("Can change the message", async () => {
        await inbox.methods.setMessage("Hi").send({ from: accounts[0] });
        let message = await inbox.methods.message().call();
        assert.equal(message, "Hi");
    });

});


// Fix:
{
// -----------------------------------------------------
// For Windows Powershell terminal:
// $env:NODE_OPTIONS = "--openssl-legacy-provider"
// For Windows Command line users:
// set NODE_OPTIONS=--openssl-legacy-provider
// -----------------------------------------------------
}