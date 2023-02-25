const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04b8eae893170840aae3ece1050ba4263ca4a2b68e418a3556637bfc3dc0821a564e8998048ff4c49d3cef9ae190d699d87fbbc80c549b360da8785cc914221551": 100,
  "043bcf6eb185a208b2166bf52fbfdbdc4bffe239f6868aac084a6765262eab4c9aba3469231b172121f8dbc77fb8d9b42ce4017400899236d9bcac1d8e2fedcf7d": 50,
  "0473915aba04d4e4df0c06283fc5207f03dbb3ec03bd261afd000a54167ef0e1a282210a15eaba2c62d85282d092a9ad8b892a513ec681d61bfa4d0169b2c4dd6b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {signature, recipient, amount } = req.body;

  console.log(signature)
  console.log(recipient)
  console.log(amount)

  const sendHash = toHex(sha256(utf8ToBytes(amount.toString())))

  const sender = secp.recoverPublicKey(sendHash, signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
