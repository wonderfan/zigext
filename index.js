const FileKeyValueStore = require("zig-client/lib/impl/FileKeyValueStore.js");
const path = require("path")
var options = {path: path.join(__dirname,"mydata")};

Promise.resolve(new FileKeyValueStore(options)).then((instance)=>{
    instance.setValue("abc",123)
});

Promise.resolve(new FileKeyValueStore(options)).then((instance)=>{
    var getPromise = instance.getValue("abc");
    getPromise.then((value)=>{
        console.log(value);
    }) 
});
