import React from 'react';
import autoBind from 'react-autobind';

class Screen extends React.Component { 
  constructor(props){
      super(props);
      autoBind(this);
      this.state = { 
        ref : React.createRef(),
        video : undefined,
        canvas : undefined,
        width : 320,
        height : undefined,
        streaming : false
      }
  }
  componentDidMount(){
    this.setState({
      video : document.getElementById('video'),
      canvas : document.getElementById('canvas'), 
    })

    let {width, streaming} = this.state;
    let setState = this.setState.bind(this);

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        let video = document.getElementById('video');

        video.srcObject = stream;
        video.play();
        
        video.addEventListener('canplay', function(ev){
          if (!streaming) {
      
            let height = video.videoHeight/(video.videoWidth/width) || width/(4/3);

            setState({height : height})

            let canvas =  document.getElementById('canvas');
            
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
          }
        }, false);
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      })
     
  }
  onClick() {
    let canvas = this.state.canvas;
    let context = canvas.getContext('2d');
    let {width, height} = this.state;

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      let data = canvas.toDataURL('image/png');
      this.props.SendPhotoStore( data );
    }
  }
  render(){
    return (
      <div className="Screen" ref={this.state.ref} >
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button onClick={this.onClick}>Take photo</button> 
        </div>  
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}

export default Screen