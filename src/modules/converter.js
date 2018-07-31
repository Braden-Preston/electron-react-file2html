// Electron
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer;

// Electron
  //

// Node built-in
const fs = remote.require('fs')
const path = remote.require('path') 

// Custom/Community
const rn = require('random-number');

// File2Html
const file2html = require('file2html')
const TextReader = require('file2html-text').default
const OOXMLReader = require('file2html-ooxml').default
const ImageReader = require('file2html-image').default




console.log(rn())


  
ipc.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipc.send('asynchronous-message', 'ping')






// Convert a .DOCX file
const docx = (fileName)=> {
    console.log("%c Converted Document", "color: hsl(133, 55%, 54%);", fileName)
    return convertFile(fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
};

const test = ()=> {
    console.log("%c Document Converter Module Loaded!", "color: hsl(199, 76%, 59%);")
};

module.exports ={  
    test,
    docx
}

function getConfigPath(file) {
    if (file) return path.join(app.getAppPath(), './src/config/', file)
    else return path.join(app.getAppPath(), './src/config/')
}

function printConfigDir() {
    fs.readdir(getConfigPath(), (err, files)=>{
        if (err) throw err;
        console.group("Directory [" + getConfigPath() + "]")
        files.forEach(file => { console.log(file) }); 
        console.groupEnd()
    })
}

function convertFile(name, mime) {
    console.group("CONVERT FILE " + name)
    let filePath = getConfigPath(name)
    console.log("File Path", filePath)
    let mimeType = mime

    printConfigDir() // print index of files contained in programfiles/config

    file2html.config({
        readers: [
            TextReader,
            OOXMLReader,
            ImageReader
        ]
    });

    fs.readFile(filePath, function (err, data) {
        if (err) {
            // throw err
        } else {
            console.log('Read File!', filePath, data);
            let fileBuffer = data // contents needs to be stored to use in file2html
            file2html.read({
                fileBuffer,
                meta: {
                    mimeType: mimeType
                }
            }).then((file) => {
                const {styles, content} = file.getData()		
                const meta = file.getMeta()
                saveFile({ css: styles, html: content, meta: meta })
                return { css: styles, html: content, meta: meta }
            });
        }
    });
}

function saveFile(json) {
    let fileContents = JSON.stringify(json)
    console.log(json)
    fs.writeFile(path.join(getConfigPath(), "post.json"), fileContents, (err)=>{
        if (err) throw err
        console.log("SAVED CONVERTED FILE!")
        console.groupEnd()
        printConfigDir() // print index again to see newly created save file
    })
}

