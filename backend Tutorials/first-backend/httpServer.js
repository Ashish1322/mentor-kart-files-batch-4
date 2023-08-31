const {createServer} = require("http")
const {readFile} = require("fs")

const myserver = createServer( (req,res) => {

    readFile("html/index.html",(err,data) => {
        if(err)
        {
            res.write("Error Occured")
            res.end();
        }
        else
        {
            res.write(data)
            res.end();
        }
    })

}
)

myserver.listen(3003)


