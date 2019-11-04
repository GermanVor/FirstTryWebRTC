import React from 'react';
import autoBind from 'react-autobind';
import Screen from './Screen';
import Card from './Сard'

class App extends React.Component { 
  constructor(props){
      super(props);
      autoBind(this);
      this.state = { 
        ref : React.createRef(),
        PhotoArr : [],
      }
  }
  componentDidMount(){
      
  }
  GetPhoto( data ){
    this.setState({
      PhotoArr : [...this.state.PhotoArr, data]
    })
  }
  render(){
    return (
      <div className="content">
        <h1>Rexpack от  <a href='https://github.com/bengrunfeld?tab=overview&from=2019-11-01&to=2019-11-03'>мужика с гита</a></h1>
        <p className="description">React, Express, and Webpack Boilerplate Application</p>
        <div className="awful-selfie"></div>
        <Screen
          SendPhotoStore = {this.GetPhoto}
        />
        {this.state.PhotoArr.map( (el, ind) => (
          <Card 
            data = {el}
          />
        ))}
      </div>
    )
  }
}

export default App