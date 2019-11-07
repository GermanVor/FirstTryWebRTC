import React from 'react';
import autoBind from 'react-autobind';
import '../css/screen.css'

class Screen extends React.Component { 
  constructor(props) {
      super(props);
      this.state = { 
        ref : React.createRef(),
        video : undefined,
        canvas : undefined,
        width : 320,
        height : undefined,
        streamingBool : false,
        stream : undefined,
        mediaDevices : false
      }
      autoBind(this);
  }
  componentDidMount() {
    let Tog = this.Toggle.bind(this);
    window.onblur = function(){
      document.querySelector('input[type="checkbox"]').checked = false ;
      Tog()
    };

    this.setState({
      video : document.getElementById('video'),
      canvas : document.getElementById('canvas'), 
    })

    let {width } = this.state;
    let setState = this.setState.bind(this);

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        let video = document.getElementById('video');

        video.srcObject = stream;
        video.play();
        setState({ stream: stream });

        document.querySelector('input[type="checkbox"]').checked = true;

        video.addEventListener('canplay', function(ev){
    
          let height = video.videoHeight/(video.videoWidth/width) || width/(4/3);

          setState({
            height : height,
            streamingBool : true
          })

          let canvas =  document.getElementById('canvas');
          
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          
        }, false);
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
        setState({ streamingBool: false })
      })
  }
  onClick() {
    let {width, height} = this.state;
    
    if (width && height) {
      let canvas = this.state.canvas;
      let context = canvas.getContext('2d');
      
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      let data = canvas.toDataURL('image/png');
      this.props.SendPhotoStore( data );
    }
  }
  OffStream() {
    if(this.state.streamingBool){
      let video = this.state.video
      video.pause();
      this.state.stream.getTracks()[0].stop();

      this.setState(( ) => {
        return {streamingBool: false};
      })
    }
  }
  OnStream() {
    if( !this.state.streamingBool ){
      const {video} = this.state;
      let setState = this.setState.bind(this);
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
        
          video.srcObject = stream;
          video.play();
          setState(()=>({
            stream: stream,
            streamingBool: true
          }));

        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
          setState(()=>( {streamingBool: false} ))
        })
    }
  }
  Toggle() {
    document.querySelector('input[type="checkbox"]').checked ? this.OnStream() : this.OffStream() ;
  }
  render(){
    return (
      <div className="Screen" ref={this.state.ref} >
        <div className='info'>
          Сайт не собирает никакие метрики или информацию посетителей. <br/>
          Для хранения готовых фотографий используется localStorage браузера. 
        </div>  
        <div className="camera">
          <video id="video">Video stream not available.</video>
        </div>
        <div className="ScreenPanel">
          <button  type="button" className="btn btn-info" onClick={this.onClick}>Take photo</button>
          <label className="switch">
            <input type="checkbox" onChange={this.Toggle} />
            <span className="slider round"></span>
          </label>
        </div> 
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}

export default Screen