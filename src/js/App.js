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
        PhotoObj : [],
      }
  }
  componentDidMount(){
      
  }
  AddPhoto( data ){
    let i = 0;
    while(this.state.PhotoObj[i]) i++;
 
    let a = {};
    a[i] = data;
    
    this.setState({
      PhotoObj : { ...this.state.PhotoObj, ...a }
    })
  }
  DelPhoto( ind ){
    let a = { ...this.state.PhotoObj};
    delete a[ind];
  
    this.setState({PhotoObj : a})
  }
  render(){
    const PhotoObj = this.state.PhotoObj;
   
    return (
      <div className="content">
        <h1>Rexpack от  <a href='https://github.com/bengrunfeld?tab=overview&from=2019-11-01&to=2019-11-03'>мужика с гита</a></h1>
        <Screen
          SendPhotoStore = {this.AddPhoto}
        />
        {Object.keys(PhotoObj).map( key => (
          <Card 
            data = {PhotoObj[key]}
            id = { key }
            Del = {this.DelPhoto}
          />
        ))}
      </div>
    )
  }
}

export default App