import React from 'react';
import autoBind from 'react-autobind';
import '../css/card.css'

class Card extends React.Component { 
  constructor(props){
      super(props);
      autoBind(this);
      this.state = { 
        ref : React.createRef(),
      }
  }
  componentDidMount(){}
  Del(){
    let id = this.state.ref.current.id;
    
    this.props.Del( id.split('-')[1] );
  }
  
  render(){
    return (
      <div className='ProfilCard'  ref={this.state.ref} id={'card-' + this.props.id} key = {'card-' + this.props.id}>
        <div className="output">
          <img src = {this.props.data} alt="The screen capture will appear in this box."/> 
        </div>
        <div>
          <button type="button" className="btn btn-info" onClick={ this.Del }>Delete</button>
        </div>
      </div>
    )
  }
}

export default Card