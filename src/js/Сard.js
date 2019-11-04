import React from 'react';
import autoBind from 'react-autobind';

class Card extends React.Component { 
  constructor(props){
      super(props);
      autoBind(this);
      this.state = { 
        ref : React.createRef(),
      }
  }
  componentDidMount(){
    
  }
  render(){
    return (
      <div className='ProfilCard'>
        <div className="output">
          <img src = {this.props.data} alt="The screen capture will appear in this box."/> 
        </div>
        <div>
          <input type="submit" value="Delete" onClick={ this.Del }/>
          <input type="submit" value="Share" onClick={ this.Share }/>
        </div>
      </div>
    )
  }
}

export default Card