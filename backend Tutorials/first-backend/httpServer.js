const {createServer} = require("http")
const {readFile} = require("fs")
const path = require("path")

const myserver = createServer( (req,res) => {
    let file = req.url
    file = path.basename(file)

    let ext = path.extname(file)

    if(ext == ".html")
    {
        readFile(`html/${file}`,(err,data) => {
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
    else
    {
        res.write("Only Html Files i can server")
        res.end();
    }
    


}
)

myserver.listen(3003)


