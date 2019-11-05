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
  componentDidMount() {
    this.setState({ PhotoObj : localStorage })
    console.log('Rexpack от https://github.com/bengrunfeld');
  }
  AddPhoto( data ) {
    let i = 0;
    while(this.state.PhotoObj[i]) i++;
 
    let a = {};
    a[i] = data;
    
    this.setState({
      PhotoObj : { ...this.state.PhotoObj, ...a }
    });

    localStorage.setItem(i, data);
  }
  DelPhoto( ind ) {
    let a = { ...this.state.PhotoObj};
    delete a[ind];
    delete localStorage[ind] 
    this.setState({PhotoObj : a})
  }
  render() {
    const PhotoObj = this.state.PhotoObj;
   
    return (
      <div className="content">
        <Screen
          SendPhotoStore = {this.AddPhoto}
        />
        <div className='CardBox'>
          {Object.keys(PhotoObj).map( key => (
            <Card 
              data = {PhotoObj[key]}
              id = { key }
              Del = {this.DelPhoto}
              key = {PhotoObj[key]}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App