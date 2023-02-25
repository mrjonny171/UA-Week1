const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils")

const privateKey = secp.utils.randomPrivateKey()

console.log(toHex(privateKey))

const publicKey = secp.getPublicKey(privateKey)

console.log(toHex(publicKey))

//Tests

//1 a8fbbc6a50001ff99418eebc963a8086f6d16e6151cbf82bd72b2b944605bab6 

//2 d70d1705c7c115cc1e6c546de4412996b87101b5144a6b85ec1c8091db7ace98

//3 953424e7ebc03c2351d1d78f27622ec704d68432747f50fe4be648db854bc941
