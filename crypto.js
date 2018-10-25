var path = require("path");
var utils = require("zig-client/lib/utils.js")
var config = utils.getConfig();
config.set("crypto-suite-software",{
		"EC": "zig-client/lib/impl/CryptoSuite_ECDSA_AES.js"
});
config.set("crypto-hash-algo","SHA2");
config.set("crypto-keysize", 256);
config.set("crypto-hsm",false);
config.set("key-value-store","zig-client/lib/impl/FileKeyValueStore.js");
//var cryptoSuite = utils.newCryptoSuite({software: true,keysize: 256,algorithm: 'EC'});
var cryptoSuite = utils.newCryptoSuite();
var keyValStorePath = path.join(__dirname,'.keystore');
cryptoSuite.setCryptoKeyStore(utils.newCryptoKeyStore({path: keyValStorePath}));
var startTime = Date.now();
var endTime;
cryptoSuite.generateKey().then( key => {
    var plainText = "ZigLedger is great";
    var digestText = cryptoSuite.hash(plainText);
    var signature = cryptoSuite.sign(key,digestText);
    var result = cryptoSuite.verify(key,signature,Buffer.from(plainText));
    endTime = Date.now();
    console.log("ECDSA_AES verification result : ",result);
    console.log("It takes %s milliseconds to finish the crypto step.", endTime - startTime);
}, err => {
    console.error(err);
}).catch( exception => {
    console.error(exception);
});
