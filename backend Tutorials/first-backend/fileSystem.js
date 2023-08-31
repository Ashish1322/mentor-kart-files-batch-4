

const {readFile, writeFile, unlink,rename,appendFile} = require("fs")


// CREATE
function createFile(path,initialContent)
{

    writeFile(path,initialContent,(err,data) => {
        if(err){
            console.log("Error: ",err.message)
        }
        else
        {
            console.log("File Updated")
        }
    })
}

// READ
function readContent(path) {
    readFile(path,(err,data) => {
        if(err)
        {
            console.log("Error Occured : ",err.message)
        }
        else
        {
            console.log("Content of File is ",data)
        }
    })
}

// UPDATE
function updateFile(path,contecnt){

    // appendFile
    writeFile(path,contecnt,(err,data) => {
        if(err){
            console.log("Error: ",err.message)
        }
        else
        {
            console.log("File Updated")
        }
    })

}

// DELETE
function deletFile(path)
{
    unlink(path,(err,res) => {
        if(err)
        {
            console.log("Error ",err.message)
        }
        else
        {
            console.log("File Deteled")
        }
    })
}

// RENAME
function renameFile(oldpath,newPath) {

    rename(oldpath,newPath,(err,res) => {
        if(err)
        {
            console.log("Error ",err.message)
        }
        else
        {
            console.log("Renamed")
        }
    })
    
}




