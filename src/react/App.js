// React
import React from 'react'
import logo from '../media/logo.svg'
import ConvertBox from './ConvertBox'
import Header from './Header'
import './App.css'

// Electron
const app = window.require('electron').remote.app

// Node Built-In
  //

// Custom/Community
  //



class App extends React.Component {

  render() {
    function btnConvert(e) {
      e.preventDefault()
      alert('sample.docx')
    }
    return (
      <div className="App">
        <Header title={config.headerTitle} name={config.headerName}/>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React + Electron + Webpack + file2html = <span role="img" aria-label="love">🌴</span></h2>
        </div>
        <p className="App-intro">
          <b> React: {React.version} </b>
          Node: {app.getVersion()}
        </p>
        <ConvertBox />
      </div>
    )
  }
}

export default App

const config = {
  headerTitle: 'This is Header Title 🐫',
  headerName: 'Braden'
}