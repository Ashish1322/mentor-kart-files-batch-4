const path = require("path")

var p = "http://127.0.0.1:3003/about.html"

console.log(path.basename(p)) // will provide you the base file in which the path is poiting
console.log(path.delimiter)
console.log(path.dirname(p)) 
console.log(path.extname(p)) // will give u the extension