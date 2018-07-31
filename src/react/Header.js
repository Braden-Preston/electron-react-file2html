import React, { Component } from 'react';
import './Header.css'

// Require additional modules here if needed  (ex: markup coloring)

class Header extends Component {
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };
  
  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };
  
  componentDidMount() { // Was the component added to the BrowserWindow?
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }

  render() {
    // if (this.props.admin) {
    //   return (
    //     <button onClick={this.handleClick} className="nametag">Hello {this.state.name}!</button>
    //   )
    // } else {
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
        <button onClick={this.handleClick} className="nametag">Name: {this.props.name}, Time: {this.state.currentTimestamp.toLocaleString()}, Count: {this.state.clickCounter}</button>
      </div>
    )
    // }
  }

}

export default Header 