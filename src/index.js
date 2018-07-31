// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import './index.css';

// Electron
import * as file2html from 'file2html';
import TextReader from 'file2html-text';
import OOXMLReader from 'file2html-ooxml';
import ImageReader from 'file2html-image';

window.require('electron-react-devtools').install()
window.require('devtron').install() // Isn't able to hook up with Main Process yet?
const electron = window.require('electron')
const remote = electron.remote;
const app = remote.app
const electron_process = electron.process;
const electron_app = electron.app;
const ipc = electron.ipcRenderer;
const dialog = remote.dialog;

// Node Built-In
const builtinModules = remote.require('builtin-modules')
const fs = remote.require('fs')
const path = remote.require('path') 

// Custom/Community
const cat = require('./modules/cat')
const rn = require('random-number');

// require('../../name.js') // Two directories up, then file name
// require('../name.js') // One directory up, then file name
// require('./name.js') // same directory, file name



// Initialization of React App
ReactDOM.render(<App />, document.getElementById('root'));






// Main Block



// window.postMessage("update-html", 'http://localhost:3000')


// function getConfigPath(file) {
//     if (file) return path.join(app.getAppPath(), './config/', file)
//     else return path.join(app.getAppPath(), './config/')
// }

// function printConfigDir() {
//     fs.readdir(getConfigPath(), (err, files)=>{
//         if (err) throw err;
//         console.group("Directory [" + getConfigPath() + "]")
//         files.forEach(file => { console.log(file) }); 
//         console.groupEnd()
//     })
// }

// // Create config directory local to install. Add in default files
// fs.mkdir(path.join(getConfigPath(), 'userData/'), (err)=>{
//     if (err) console.log("./config/userData already exists")
//     if (!err) console.log("Created userData/ directory in .config/")
//     fs.writeFile(getConfigPath('post.txt'), "This is some new text.", (err)=>{
//         if (err) throw err
//         // else convertFile('sample.docx')
//     })
// })


// function convertFile(name) {
//     console.group("CONVERT FILE " + name)
//     let filePath = getConfigPath(name)

//     printConfigDir() // print index of files contained in programfiles/config

//     file2html.config({
//         readers: [
//             TextReader,
//             OOXMLReader,
//             ImageReader
//         ]
//     });

//     fs.readFile(filePath, function (err, data) {
//         if (err) {
//             throw err
//         } else {
//             console.log('Read File!', filePath, data);
//             let fileBuffer = data // contents needs to be stored to use in file2html
//             file2html.read({
//                 fileBuffer,
//                 meta: {
//                     mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//                 }
//             }).then((file) => {
//                 const {styles, content} = file.getData()		
//                 const meta = file.getMeta()
//                 // Publish Results to DataView Module later
//                 document.body.innerHTML = styles + content
//                 // console.log("Result", styles + content)
//                 // console.log("MetaInfo", meta)
//                 saveFile({ css: styles, html: content, meta: meta })
//             });
//         }
//     });
// }

// function saveFile(json) {
//     let fileContents = JSON.stringify(json)
//     console.log(json)
//     fs.writeFile(path.join(getConfigPath(), "post.json"), fileContents, (err)=>{
//         if (err) throw err
//         console.log("SAVED CONVERTED FILE!")
//         console.groupEnd()
//         printConfigDir() // print index again to see newly created save file
//     })
// }