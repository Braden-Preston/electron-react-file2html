// React
import React, { Component } from 'react'
import './ConvertBox.css'

// Electron
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app

// Node Built-In
const fs = remote.require('fs')
const path = remote.require('path')

// Custom/Community
const cat = require('../modules/cat')
const convert = require('../modules/converter')
const rn = require('random-number')

cat.test()


// console.log("whereto ", path.join(__dirname, "/src/modules/documentConverter.js"))
// console.log("whereto new", path.join(app.getAppPath(), "./src/modules/documentConverter.js"))
// console.log("whereto resolve", path.resolve(app.getAppPath(), "./src/modules/documentConverter.js"))

// function getModulePath(file) {
//   if (file) return path.join(app.getAppPath(), './src/modules/', file)
//   else return path.join(app.getAppPath(), './src/modules/')
// }


// function printModulePath() {
//   fs.readdir(path.join(app.getAppPath()), (err, files)=>{
//       if (err) throw err;
//       console.group("Directory [" + "Test" + "]")
//       files.forEach(file => { console.log(file) }); 
//       console.groupEnd()
//   })
// }

// printModulePath()



const content = "This is a document that has been converted is placed. Congrats! You have done it!"

class Name extends Component {
  constructor(props) {
    super(props)
    this.name = "Braden " + rn()

    this.state = {
      boxContent: '',
    };
  }

  convertFile = () => {
    console.log("are you sure?")
    convert.docx('sample.docx')
    this.setState(() => {
      return { boxContent: "File was converted" };
    });
  };
  
  render() {
    return (
      <div className="convertBox">
        <button className="button" onClick={this.convertFile}>Convert File</button>
        <div className="box">{this.state.boxContent}</div>
      </div>
    )
  }
}

export default Name 