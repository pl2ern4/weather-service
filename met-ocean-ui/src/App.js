import React, { Component } from 'react';
import logo from './logo.svg';
import TableComponent from './TableComponent';
import './App.css';

class App extends Component {
  state = {
    data:[]
  }
  
  componentWillMount(){
    this.callApi()
      .then(data => this.setState({data}))
      .catch(err => console.log(err));
  }

  callApi = async()=>{
    const response = await fetch('/api')
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return <TableComponent {...this.state}/>
  }
}

export default App;
